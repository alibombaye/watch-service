import { dbAddStreamToUserWatchingList, dbGetWatchingListForUser } from '../dbService';
import { MaximumConcurrentStreamsExceeded } from '../../errors/errors';
import { MAX_AMOUNT_STREAMS } from '../../constants/config';

describe('dbService', () => {
    afterEach(() => {
        watchingDb = {}
    });

    describe('dbAddStreamToUserWatchingList', () => {
        describe('when the user is not watching anything', () => {
            test('returns true and adds the user to the watching list with the stream', () => {
                watchingDb = {};
                
                expect(dbAddStreamToUserWatchingList(1,1)).toBe(true);
                
                expect(watchingDb).toEqual({ 1: { streams: [1]} });
            });

            test('adds a different user should add the additional user', () => {
                watchingDb = { 1: { streams: [1] }};

                expect(dbAddStreamToUserWatchingList(2,1)).toBe(true);

                expect(watchingDb).toEqual({ 1: { streams: [1]}, 2: { streams: [1] } });
            });
        });

        describe('when the user is already watching a stream', () => {
            test('should be able to watch an additional stream', () => {
                watchingDb = { 1: { streams: [1] }};

                expect(dbAddStreamToUserWatchingList(1,2)).toBe(true);

                expect(watchingDb).toEqual({ 1: { streams: [1, 2] } });
            });

            test('should be able to watch the same stream', () => {
                watchingDb = { 1: { streams: [1] }};

                expect(dbAddStreamToUserWatchingList(1,1)).toBe(true);

                expect(watchingDb).toEqual({ 1: { streams: [1, 1] } });
            });
        });

        describe('when the user is already watching the maxmimum allowed streams', () => {
            test('should not be able to watch an additional stream', () => {
                const streams = Array(MAX_AMOUNT_STREAMS).fill().map((_, i) => i);
                watchingDb = { 1: { streams }};

                expect(() => dbAddStreamToUserWatchingList(1, MAX_AMOUNT_STREAMS+1)).toThrowError(new MaximumConcurrentStreamsExceeded('can not watch more than 3 stream concurrently'));
            });
        });
    });

    describe('dbGetWatchingListForUser', () => {
        describe('when the user is not watching anything', () => {
            test('responds with []', () => {
                watchingDb = {};
                
                expect(dbGetWatchingListForUser(1)).toEqual([]);
            })
        });

        describe('when the user is watching a single stream', () => {
            test('responds with [1]', () => {
                watchingDb = { 1: { streams: [1] }};
                
                expect(dbGetWatchingListForUser(1)).toEqual([1]);
            })
        });
    })
});
