import { StreamNotRecognisedError } from '../../errors/errors';
import { findStream } from '../streamServiceConnector';

describe('streamServiceConnector', () => {
    describe('findStream', () => {
        describe('when the stream does not exist', () => {
            test('responds with a StreamNotRecognisedError', async () => {
                const NOT_A_VALID_STREAM = 999;
                expect(() => findStream(NOT_A_VALID_STREAM)).toThrowError(new StreamNotRecognisedError('not a recognised stream'));
            });
        });

        describe('when the stream does exist', () => {
            test('responds with true if the stream does exist', () => {
                expect(findStream(1)).toBe(true);
            });
        });
    });
})