const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
        res.status(200).json({ endpoints: 'api.cryptic.icu/dns/{hostname}, api.cryptic.icu/domain/ssl/{hostname}'});
    
});

app.get('/dns/:hostname', async (req, res) => {
    const { hostname } = req.params;

    try {
        const response = await axios.get(`https://networkcalc.com/api/dns/lookup/${hostname}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.get('/domain/ssl/:hostname', async (req, res) => {
    const { hostname } = req.params;

    try {
        const response = await axios.get(`https://networkcalc.com/api/security/certificate/${hostname}`);
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.use((req, res, next) => {
        res.status(404).json({ error: 'not found...' });
});

app.listen(port, () => {
    console.log(`makeshift API is running on port ${port}`);
});
