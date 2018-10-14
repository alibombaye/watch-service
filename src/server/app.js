import express from 'express';

const app = express();

app.get('/health-check', (req, res) => {
    res.status(200).send({
        success: 'true'
    });
});

app.post('/api/v1/watch/user/:userId/stream/:streamId', (req, res) => {
    res.status(404).send({
        success: 'false',
        message: 'not a recognised user'
    });
});

export default app;