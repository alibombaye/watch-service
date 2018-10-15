import express from 'express';
import bodyParser from 'body-parser';
import { addStreamToUserWatchingList, getWatchingListForUser } from '../service/watchService';
import { UserNotRecognisedError, StreamNotRecognisedError, MaximumConcurrentStreamsExceeded } from '../errors/errors';

const app = express();

const createErrorResponse = (response, statusCode, success, message) => 
    response.status(statusCode).send({
        success,
        message
    });

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
            createErrorResponse(res, 404, 'false', e.message);
        } 
        if (e instanceof MaximumConcurrentStreamsExceeded) {
            createErrorResponse(res, 400, 'false', e.message);
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
            createErrorResponse(res, 404, 'false', e.message);
        }
    }
});

export default app;
