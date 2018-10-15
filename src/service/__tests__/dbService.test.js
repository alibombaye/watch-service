import { dbAddStreamToUserWatchingList, dbGetWatchingListForUser } from '../dbService';

describe('dbService', () => {
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

    });

    describe('dbGetWatchingListForUser', () => {
        describe('when the user is not watching anything', () => {
            test('responds with []', () => {
                watchingDb = {};
                
                expect(dbGetWatchingListForUser(1)).toEqual([]);
            })
        });
    })
});
