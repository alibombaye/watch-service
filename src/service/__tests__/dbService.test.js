import { watchingDb, dbAddStreamToUserWatchingList } from '../dbService';

describe('dbService', () => {
    describe('dbAddStreamToUserWatchingList', () => {
        describe('when the user is not watching anything', () => {
            test('returns true and adds the user to the watching list with the stream', () => {
                expect(watchingDb[1]).toEqual(undefined);
                
                expect(dbAddStreamToUserWatchingList(1,1)).toBe(true);
                
                expect(watchingDb).toEqual({ 1: { streams: [1]} });
            });
        })

    });
});