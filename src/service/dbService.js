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

    else if (watchingDb[userId]) {
        const newStreams = watchingDb[userId].streams.concat([streamId]);
        watchingDb = ({
            ...watchingDb,
            [userId]:{
                streams: newStreams
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