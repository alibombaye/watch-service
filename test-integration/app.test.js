import request from 'supertest';
import app from '../src/server/app';

describe('get /health-check', () => {
    let response;

    beforeEach(async ()=> {
        response = await request(app).get('/health-check');
    })

    test('should respond with 200 when the app is running', () => {
        expect(response.statusCode).toBe(200);
    });

    test('should respond with "sucess: true" when the app is running', () => {
        expect(response.body).toEqual({ success: 'true' });
    })
});

describe('post /api/v1/watch', () => {
    describe('when the user does not exist', () => {
        test('should respond with a 404', async () => {
            const NOT_A_VALID_USER = 999;
            const response = await request(app).post(`/api/v1/watch/user/${NOT_A_VALID_USER}/stream/1`);
            expect(response.statusCode).toBe(404);
        });

        test('should respond with "success: false"', async () => {
            const NOT_A_VALID_USER = 999;
            const response = await request(app).post(`/api/v1/watch/user/${NOT_A_VALID_USER}/stream/1`);
            expect(response.body).toEqual({ success: 'false' });
        });
    });
});