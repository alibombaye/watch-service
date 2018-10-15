import { findUser } from '../connector/userServiceConnector';
import { findStream } from '../connector/streamServiceConnector';

export const watchService = (userId, streamId) => {
    findUser(userId);
    findStream(streamId);
}

export const getWatchingListForUser = (userId) => {
    findUser(userId);
    return [];
}