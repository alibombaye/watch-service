import request from 'supertest';
import app from '../src/server/app';

describe('get /health-check', () => {
    let response;

    beforeEach(async ()=> {
        response = await request(app).get('/health-check');
    })

    test('responds with 200 when the app is running', () => {
        expect(response.statusCode).toBe(200);
    });

    test('responds with "sucess: true" when the app is running', () => {
        expect(response.body).toEqual({ success: 'true' });
    })
})