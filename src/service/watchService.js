import { isUserValid } from '../connector/userServiceConnector';
import { isStreamValid } from '../connector/streamServiceConnector';
import { dbAddStreamToUserWatchingList, dbGetWatchingListForUser } from './dbService';

export const addStreamToUserWatchingList = (userId, streamId) => {
    isUserValid(userId);
    isStreamValid(streamId);
    return dbAddStreamToUserWatchingList(userId, streamId);
};

export const getWatchingListForUser = (userId) => {
    isUserValid(userId);
    return dbGetWatchingListForUser(userId);
};
