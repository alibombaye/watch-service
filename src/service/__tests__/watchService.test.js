import { getWatchingListForUser, addStreamToUserWatchingList } from '../watchService';
import { UserNotRecognisedError, StreamNotRecognisedError } from '../../errors/errors';
import { isUserValid } from '../../connector/userServiceConnector';
import { findStream } from '../../connector/streamServiceConnector';
import * as DbService from '../dbService';

jest.mock('../../connector/userServiceConnector');
jest.mock('../../connector/streamServiceConnector');
jest.mock('../dbService');

describe('addStreamToUserWatchingList', () => {
    afterEach(() => {
        isUserValid.mockReset();
        findStream.mockReset();
    });

    describe('when the user does not exist', () => {
        test('throws an UserNotRecognisedError', () => {
            isUserValid.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            expect(() => addStreamToUserWatchingList(999, 1)).toThrowError(new UserNotRecognisedError('not a recognised user'));
        });
    });

    describe('when the stream does not exist', () => {
        test('throws a StreamIsNotRecognisedError', () => {
            isUserValid.mockImplementation(() => {});
            findStream.mockImplementation(() => {
                throw new StreamNotRecognisedError('not a recognised stream')
            });
            expect(() => addStreamToUserWatchingList(999, 1)).toThrowError(new StreamNotRecognisedError('not a recognised stream'));
        });
    });

    describe('when the user and stream does exist', () => {
        test('adds the stream to the users watching list', () => {
            isUserValid.mockImplementation(() => {});
            findStream.mockImplementation(() => {}); 
            const spy = jest.spyOn(DbService, 'dbAddStreamToUserWatchingList').mockImplementation(() => true);

            expect(addStreamToUserWatchingList(1, 1)).toBe(true);
            expect(spy).toBeCalledWith(1, 1);
        });
    });
});

describe('getWatchingListForUser', () => {
    afterEach(() => {
        isUserValid.mockReset();
        findStream.mockReset();
    });

    describe('when the user does not exist', () => {
        test('throws an UserNotRecognisedError', () => {
            isUserValid.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            expect(() => getWatchingListForUser(999, 1)).toThrowError(new UserNotRecognisedError('not a recognised user'));
        });
    });

    describe('when the user does exist', () => {
        describe('when the user is not watching anything', () => {
            test('should respond with []', () => {
                isUserValid.mockImplementation(() => {});
                const spy = jest.spyOn(DbService, 'dbGetWatchingListForUser').mockImplementation(() => []);

                expect(getWatchingListForUser(1)).toEqual([]);
                expect(spy).toBeCalledWith(1);
            });
        });

        describe('when the user is watching a single stream', () => {
            isUserValid.mockImplementation(() => {});
            const spy = jest.spyOn(DbService, 'dbGetWatchingListForUser').mockImplementation(() => [1]);

            expect(getWatchingListForUser(1)).toEqual([1]);
            expect(spy).toBeCalledWith(1);
        });
    });
});
