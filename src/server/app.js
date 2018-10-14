import express from 'express';
import { watchService } from '../service/watchService';
import { UserNotRecognisedError, StreamNotRecognisedError } from '../errors/errors';

const app = express();

app.get('/health-check', (req, res) => {
    res.status(200).send({
        success: 'true'
    });
});

app.post('/api/v1/watch/user/:userId/stream/:streamId', (req, res) => {
    try {
        const response = watchService(1, 1);
    } catch (e) {
        if (e instanceof UserNotRecognisedError || e instanceof StreamNotRecognisedError) {
            res.status(404).send({
                success: 'false',
                message: e.message
            })
        }
    }
});

export default app;