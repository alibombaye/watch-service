import express from 'express';

const app = express();

app.get('/health-check', (req, res) => {
    res.status(200).send({
        success: 'true'
    });
});

app.post('/api/v1/watch/user/:userId/stream/:streamId', () => {
    res.status(404).send({});
});

export default app;