import { UserNotRecognisedError } from '../errors/errors';

export const watchService = (userId, streamId) => {
    throw new UserNotRecognisedError('not a recognised user');
}