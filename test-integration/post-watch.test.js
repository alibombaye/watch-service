import request from 'supertest';
import app from '../src/server/app';
import { isUserValid } from '../src/connector/userServiceConnector';
import { findStream } from '../src/connector/streamServiceConnector';
import { StreamNotRecognisedError, UserNotRecognisedError } from '../src/errors/errors';
import { MAX_AMOUNT_STREAMS } from '../src/constants/config';

jest.mock('../src/connector/streamServiceConnector');
jest.mock('../src/connector/userServiceConnector');

describe('post /api/v1/watch', () => {
    describe('Validate input parameters', () => {
        describe('when the userId is missing from the request', () => {
            test('should respond with a 404', async () => {
                const response = await request(app).get(`/api/v1/watch/user`);
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
            response = await request(app).post(`/api/v1/watch/user/${NOT_A_VALID_USER}/stream/1`);
        });
        
        afterEach(() => {
            isUserValid.mockReset();
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
                isUserValid.mockImplementation(() => {});
                findStream.mockImplementation(() => {
                    throw new StreamNotRecognisedError('not a recognised stream')
                });
                response = await request(app).post(`/api/v1/watch/user/1/stream/${NOT_A_VALID_STREAM}`);
            });

            afterEach(() => {
                isUserValid.mockReset();
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
                beforeEach(()=> {
                    isUserValid.mockImplementation(() => {});
                    findStream.mockImplementation(() => {});
                });
    
                afterEach(() => {
                    isUserValid.mockReset();
                    findStream.mockReset();
                });

                test('should respond with a 201', async () => {
                    const response = await request(app).post(`/api/v1/watch/user/1/stream/1`);
                    expect(response.statusCode).toBe(201);
                });

                test('should respond with "success: true"', async () => {
                    const response = await request(app).post(`/api/v1/watch/user/1/stream/1`);
                    expect(response.body.success).toEqual('true');
                });

                test('should add the stream to the users watching list', async () => {
                    watchingDb = {};
                    const initialStreamList = await request(app).get('/api/v1/watch/user/1')
                    expect(initialStreamList.body.streams).toEqual([]);

                    await request(app).post(`/api/v1/watch/user/1/stream/1`);

                    const updatedStreamList = await request(app).get('/api/v1/watch/user/1')
                    expect(updatedStreamList.body.streams).toEqual([1]);
                });

                test('should be able to watch 2 streams', async () => {
                    watchingDb = {};
                    const initialStreamList = await request(app).get('/api/v1/watch/user/1')
                    expect(initialStreamList.body.streams).toEqual([]);

                    await request(app).post(`/api/v1/watch/user/1/stream/1`);
                    await request(app).post(`/api/v1/watch/user/1/stream/2`);

                    const updatedStreamList = await request(app).get('/api/v1/watch/user/1')
                    expect(updatedStreamList.body.streams).toEqual([1, 2]);
                });

                test(`should not be able to watch more than ${MAX_AMOUNT_STREAMS} streams`, async () => {
                    watchingDb = {};
                    const expectedMessage = `can not watch more than ${MAX_AMOUNT_STREAMS} stream concurrently`;
                    const initialStreamList = await request(app).get('/api/v1/watch/user/1')
                    expect(initialStreamList.body.streams).toEqual([]);

                    let i;
                    for (i=0; i < MAX_AMOUNT_STREAMS; i++) {
                        await request(app).post(`/api/v1/watch/user/1/stream/${i}`);
                    }
                    const response = await request(app).post(`/api/v1/watch/user/1/stream/${i+1}`);

                    expect(response.statusCode).toBe(400);
                    expect(response.body.success).toEqual('false');
                    expect(response.body.message).toEqual(expectedMessage);
                });
            });
        });
    });
});
