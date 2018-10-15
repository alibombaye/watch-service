global.watchingDb = {}

export const dbAddStreamToUserWatchingList = (userId, streamId) => {
    if (!watchingDb || !watchingDb[userId]) {
        watchingDb = ({
            ...watchingDb,
            [userId]:{
                streams: [streamId]
            }
        });
    }

    return true;
};

export const dbGetWatchingListForUser = (userId) => {
    if (!watchingDb || !watchingDb[userId]) {
        return [];
    }
    return watchingDb[userId].streams;
}