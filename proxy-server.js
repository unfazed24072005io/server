// proxy-server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

const API_BASE = 'https://estartup.epharmasoftware.com/admin/api';

// Universal proxy endpoint
app.get('/proxy/:endpoint', async (req, res) => {
    try {
        const endpoint = req.params.endpoint;
        const url = `${API_BASE}/${endpoint}${req._parsedUrl.search || ''}`;
        
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'E-Startup-Suvidha-App/1.0'
            },
            timeout: 10000
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch data',
            message: error.message 
        });
    }
});

// Specific endpoints for better organization
app.get('/api/categories', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/getcategoryapi.php`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/services', async (req, res) => {
    try {
        const catid = req.query.catid;
        const url = catid 
            ? `${API_BASE}/getserviceapi.php?catid=${catid}`
            : `${API_BASE}/getserviceapi.php`;
        
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/service/:id', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/gettabproductapi.php?productid=${req.params.id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/sliders', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/getsliderapi.php`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/getreviewapi.php`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Customer registration
app.post('/api/customer/register', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/uploadcustomerapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Customer profile update
app.put('/api/customer/update', async (req, res) => {
    try {
        const response = await fetch(`${API_BASE}/updatecustomerapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});