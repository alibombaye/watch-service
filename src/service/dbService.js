import { MaximumConcurrentStreamsExceeded } from '../errors/errors';
import { MAX_AMOUNT_STREAMS } from '../constants/config';

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
        if (newStreams.length > MAX_AMOUNT_STREAMS) throw new MaximumConcurrentStreamsExceeded(`can not watch more than ${MAX_AMOUNT_STREAMS} stream concurrently`);
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
};
