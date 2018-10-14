import { watchService } from '../watchService';
import { UserNotRecognisedError, StreamNotRecognisedError } from '../../errors/errors';
import { findUser } from '../../connector/userServiceConnector';
import { findStream } from '../../connector/streamServiceConnector';

jest.mock('../../connector/userServiceConnector');
jest.mock('../../connector/streamServiceConnector');

describe('watch-service', () => {

    afterEach(() => {
        findUser.mockReset();
        findStream.mockReset();
    });

    describe('when the user does not exist', () => {
        test('throws an UserNotRecognisedError', () => {
            findUser.mockImplementation(() => {
                throw new UserNotRecognisedError('not a recognised user')
            });
            expect(() => watchService(999, 1)).toThrowError(new UserNotRecognisedError('not a recognised user'));
        });
    });

    describe('when the stream does not exist', () => {
        test('throws a StreamIsNotRecognisedError', () => {
            findUser.mockImplementation(() => {});
            findStream.mockImplementation(() => {
                throw new StreamNotRecognisedError('not a recognised stream')
            });
            expect(() => watchService(999, 1)).toThrowError(new StreamNotRecognisedError('not a recognised stream'));
        });
    });
    
})