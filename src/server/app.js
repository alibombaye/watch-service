import express from 'express';

const app = express();

app.get('/health-check', (req, res) => {
    res.status(200).send({
        success: 'true'
    });
});

export default app;