import { UserNotRecognisedError } from "../errors/errors";

export const findUser = userId => {
    throw new UserNotRecognisedError('not a recognised user');
}