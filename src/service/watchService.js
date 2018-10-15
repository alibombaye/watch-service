import { findUser } from '../connector/userServiceConnector';
import { findStream } from '../connector/streamServiceConnector';
import { dbAddStreamToUserWatchingList, dbGetWatchingListForUser } from './dbService';

export const addStreamToUserWatchingList = (userId, streamId) => {
    findUser(userId);
    findStream(streamId);
    return dbAddStreamToUserWatchingList(userId, streamId);
};

export const getWatchingListForUser = (userId) => {
    findUser(userId);
    return dbGetWatchingListForUser(userId);
};
