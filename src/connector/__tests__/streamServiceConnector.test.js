import { StreamNotRecognisedError } from '../../errors/errors';
import { isStreamValid } from '../streamServiceConnector';

describe('streamServiceConnector', () => {
    describe('isStreamValid', () => {
        describe('when the stream does not exist', () => {
            test('responds with a StreamNotRecognisedError', async () => {
                const NOT_A_VALID_STREAM = 999;
                expect(() => isStreamValid(NOT_A_VALID_STREAM)).toThrowError(new StreamNotRecognisedError('not a recognised stream'));
            });
        });

        describe('when the stream does exist', () => {
            test('responds with true if the stream does exist', () => {
                expect(isStreamValid(1)).toBe(true);
            });
        });
    });
});
