import request from 'supertest';
import app from '../src/server/app';

describe('get /health-check', () => {
    let response;

    beforeEach(async ()=> {
        response = await request(app).get('/health-check');
    });

    test('should respond with 200 when the app is running', () => {
        expect(response.statusCode).toBe(200);
    });

    test('should respond with "sucess: true" when the app is running', () => {
        expect(response.body).toEqual({ success: 'true' });
    })
});

describe('post /api/v1/watch', () => {
    describe('when the user does not exist', () => {
        let response;
        const NOT_A_VALID_USER = 999;

        beforeEach(async ()=> {
            response = await request(app).post(`/api/v1/watch/user/${NOT_A_VALID_USER}/stream/1`);
        });

        test('should respond with a 404', () => {
            expect(response.statusCode).toBe(404);
        });

        test('should respond with "success: false"', () => {
            expect(response.body.success).toEqual('false');
        });

        test('should respond with "message: not a recognised user"', () => {
            expect(response.body.message).toEqual('not a recognised user');
        });
    });
});