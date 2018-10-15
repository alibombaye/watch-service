global.watchingDb = {}

const userNotWatchingAnyStreams = (userId) => !watchingDb || !watchingDb[userId];

const userIsWatching = (userId) => watchingDb[userId];

export const dbAddStreamToUserWatchingList = (userId, streamId) => {
    if (userNotWatchingAnyStreams(userId)) {
        watchingDb = ({
            ...watchingDb,
            [userId]:{
                streams: [streamId]
            }
        });
    }

    else if (userIsWatching(userId)) {
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
    if (userNotWatchingAnyStreams(userId)) {
        return [];
    }
    return watchingDb[userId].streams;
}