import { StreamNotRecognisedError } from "../errors/errors";

export const findStream = userId => {
    throw new StreamNotRecognisedError('not a recognised stream');
}