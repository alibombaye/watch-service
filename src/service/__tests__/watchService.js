import { watchService } from '../watchService';
import { UserNotRecognisedError } from '../../errors/errors';

describe('watch-service', () => {

    describe('when the user does not exist', () => {
        test('throws an UserNotRecognisedError', () => {
            expect(() => watchService(999, 1)).toThrowError(new UserNotRecognisedError('not a recognised user'));
        });
    })
    
})