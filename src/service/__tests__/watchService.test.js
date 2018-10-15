import { addStreamToUserWatchingList, getWatchingListForUser } from '../watchService';
import { UserNotRecognisedError, StreamNotRecognisedError } from '../../errors/errors';
import { findUser } from '../../connector/userServiceConnector';
import { findStream } from '../../connector/streamServiceConnector';

jest.mock('../../connector/userServiceConnector');
jest.mock('../../connector/streamServiceConnector');

describe('addStreamToUserWatchingList', () => {
    afterEach(() => {
        findUser.mockReset();
        findStream.mockReset();
    });

    describe('when the user does not exist', () => {
        test('throws an UserNotRecognisedError', () => {
            findUser.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            expect(() => addStreamToUserWatchingList(999, 1)).toThrowError(new UserNotRecognisedError('not a recognised user'));
        });
    });

    describe('when the stream does not exist', () => {
        test('throws a StreamIsNotRecognisedError', () => {
            findUser.mockImplementation(() => {});
            findStream.mockImplementation(() => {
                throw new StreamNotRecognisedError('not a recognised stream')
            });
            expect(() => addStreamToUserWatchingList(999, 1)).toThrowError(new StreamNotRecognisedError('not a recognised stream'));
        });
    });
    
});

describe('getWatchingListForUser', () => {
    afterEach(() => {
        findUser.mockReset();
        findStream.mockReset();
    });

    describe('when the user does not exist', () => {
        test('throws an UserNotRecognisedError', () => {
            findUser.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            expect(() => getWatchingListForUser(999, 1)).toThrowError(new UserNotRecognisedError('not a recognised user'));
        });
    });

    describe('when the user does exist', () => {
        describe('when the user is not watching anything', () => {
            test('should respond with []', () => {
                findUser.mockImplementation(() => {});
                expect(getWatchingListForUser(1)).toEqual([]);
            });
        })
    });
})