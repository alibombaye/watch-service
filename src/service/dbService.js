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