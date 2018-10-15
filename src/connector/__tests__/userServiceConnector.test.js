import { UserNotRecognisedError } from '../../errors/errors';
import { findUser } from '../userServiceConnector';

describe('userServiceConnector', () => {
    describe('findUser', () => {
        describe('when the user does not exist', () => {
            test('responds with a UserNotRecognisedError', async () => {
                const NOT_A_VALID_USER = 999;
                expect(() => findUser(NOT_A_VALID_USER)).toThrowError(new UserNotRecognisedError('not a recognised user'));
            });
        });

        describe('when the user does exist', () => {
            test('responds with true if the user does exist', () => {
                expect(findUser(1)).toBe(true);
            });
        })
    });
})