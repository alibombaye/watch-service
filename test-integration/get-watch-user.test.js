import request from 'supertest';
import app from '../src/server/app';
import { isUserValid } from '../src/connector/userServiceConnector';
import { UserNotRecognisedError } from '../src/errors/errors';

jest.mock('../src/connector/userServiceConnector');

describe('get /api/v1/watch', () => {
    describe('Validate input parameters', () => {
        describe('when the userId is missing from the request', () => {
            test('should respond with a 404', async () => {
                const response = await request(app).post(`/api/v1/watch/user//stream/1`);
                expect(response.statusCode).toBe(404);
            });
        });
    });

    describe('when the user does not exist', () => {
        let response;
        const NOT_A_VALID_USER = 999;

        beforeEach(async ()=> {
            isUserValid.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            response = await request(app).get(`/api/v1/watch/user/${NOT_A_VALID_USER}`);
        });
        
        afterEach(() => {
            isUserValid.mockReset();
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

    describe('when the user does exist', () => {
        describe('when the user is not watch anything', ()=> {
            let response;
    
            beforeEach(async ()=> {
                isUserValid.mockImplementation(() => {});
                response = await request(app).get(`/api/v1/watch/user/1`);
            });

            afterEach(() => {
                isUserValid.mockReset();
            });

            test('should respond with a 200', () => {
                expect(response.statusCode).toBe(200);
            });

            test('should respond with "success: true"', () => {
                expect(response.body.success).toEqual('true');
            });

            test('should respond with "message: user is currently not watching any streams"', () => {
                expect(response.body.message).toEqual('user is currently not watching any streams');
            });

            test('should respond with "streams: []"', () => {
                expect(response.body.streams).toEqual([]);
            });
        });
    });
});
