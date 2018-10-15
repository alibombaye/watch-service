import request from 'supertest';
import app from '../src/server/app';
import { findUser } from '../src/connector/userServiceConnector';
import { findStream } from '../src/connector/streamServiceConnector';
import { StreamNotRecognisedError, UserNotRecognisedError } from '../src/errors/errors';

jest.mock('../src/connector/streamServiceConnector');
jest.mock('../src/connector/userServiceConnector');

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
            findUser.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            response = await request(app).post(`/api/v1/watch/user/${NOT_A_VALID_USER}/stream/1`);
        });
        
        afterEach(() => {
            findUser.mockReset();
            findStream.mockReset();
        })

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
        
        describe('when the stream does not exist', () => {
            let response;
            const NOT_A_VALID_STREAM = 999;
    
            beforeEach(async ()=> {
                findUser.mockImplementation(() => {});
                findStream.mockImplementation(() => {
                    throw new StreamNotRecognisedError('not a recognised stream')
                });
                response = await request(app).post(`/api/v1/watch/user/1/stream/${NOT_A_VALID_STREAM}`);
            });

            afterEach(() => {
                findUser.mockReset();
                findStream.mockReset();
            })

            test('should respond with a 404', () => {
                expect(response.statusCode).toBe(404);
            });

            test('should respond with "success: false"', () => {
                expect(response.body.success).toEqual('false');
            });
    
            test('should respond with "message: not a recognised user"', () => {
                expect(response.body.message).toEqual('not a recognised stream');
            });

        });

        describe('when the stream does exist', () => {
            describe('when the user is eligible to watch the stream', () => {
                let response;
                
                beforeEach(async ()=> {
                    findUser.mockImplementation(() => {});
                    findStream.mockImplementation(() => {});
                    response = await request(app).post(`/api/v1/watch/user/1/stream/1`);
                });
    
                afterEach(() => {
                    findUser.mockReset();
                    findStream.mockReset();
                })

                test('should respond with a 201', () => {
                    expect(response.statusCode).toBe(201);
                });
            })
        });

    });
});