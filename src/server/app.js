import express from 'express';
import bodyParser from 'body-parser';
import { addStreamToUserWatchingList, getWatchingListForUser } from '../service/watchService';
import { UserNotRecognisedError, StreamNotRecognisedError, MaximumConcurrentStreamsExceeded } from '../errors/errors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/health-check', (req, res) => {
    res.status(200).send({
        success: 'true'
    });
});

app.post('/api/v1/watch/user/:userId/stream/:streamId', (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const streamId = parseInt(req.params.streamId, 10);
        const response = addStreamToUserWatchingList(userId, streamId);
        res.status(201).send({
            success: 'true'
        });
    } catch (e) {
        if (e instanceof UserNotRecognisedError || e instanceof StreamNotRecognisedError) {
            res.status(404).send({
                success: 'false',
                message: e.message
            });
        } 
        if (e instanceof MaximumConcurrentStreamsExceeded) {
            res.status(400).send({
                success: 'false',
                message: e.message                
            });
        }
    }
});

app.get('/api/v1/watch/user/:userId', (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const response = getWatchingListForUser(userId);
        res.status(200).send({
            success: 'true',
            message: 'user is currently not watching any streams',
            streams: response
        });
    } catch (e) {
        if (e instanceof UserNotRecognisedError) {
            res.status(404).send({
                success: 'false',
                message: e.message    
            })
        }
    }
});

export default app;