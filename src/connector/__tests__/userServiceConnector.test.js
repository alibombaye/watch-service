import { UserNotRecognisedError } from '../../errors/errors';
import { isUserValid } from '../userServiceConnector';

describe('userServiceConnector', () => {
    describe('isUserValid', () => {
        describe('when the user does not exist', () => {
            test('responds with a UserNotRecognisedError', async () => {
                const NOT_A_VALID_USER = 999;
                expect(() => isUserValid(NOT_A_VALID_USER)).toThrowError(new UserNotRecognisedError('not a recognised user'));
            });
        });

        describe('when the user does exist', () => {
            test('responds with true if the user does exist', () => {
                expect(isUserValid(1)).toBe(true);
            });
        });
    });
});
