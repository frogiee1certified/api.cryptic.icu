const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
        res.status(200).json({ endpoints: 'api.cryptic.icu/dns/example.com, api.cryptic.icu/domain/ssl/example.com, api.cryptic.icu/webshot?https://example.com, api by https://frogiee.one'});
    
});

app.get('/dns/:hostname', async (req, res) => {
    const { hostname } = req.params;

    try {
        const response = await axios.get(`https://8.8.8.8/resolve?name=${hostname}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'an error occurred while processing your request' });
    }
});

app.get('/domain/ssl/:hostname', async (req, res) => {
    const { hostname } = req.params;

    try {
        const response = await axios.get(`https://networkcalc.com/api/security/certificate/${hostname}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'an error occurred while processing your request' });
    }
});

app.get('/webshot', async (req, res) => {
    const hostname = req.query.url;

    try {
        const response = await axios.get(`https://image.thum.io/get/width/1000/crop/700/` + hostname, {
            responseType: 'arraybuffer'
        });
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'an error occurred while processing your request' });
    }
});

app.use((req, res, next) => {
        res.status(404).json({ error: 'not found...' });
});

app.listen(port, () => {
    console.log(`temu API is running on port ${port}`);
});
