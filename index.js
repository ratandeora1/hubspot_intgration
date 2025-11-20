require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// HubSpot API URL
const HUBSPOT_URL = "https://api.hubapi.com/crm/v3/objects/contacts";
const HUBSPOT_DEAL_URL = "https://api.hubapi.com/crm/v3/objects/deals";

app.get('/get-contacts', async (req, res) => {
    try {
        const response = await axios.get(HUBSPOT_URL, {
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`
            }
        });

        res.json({
            success: true,
            total: response.data.total,
            results: response.data.results
        });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);

        res.json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});
app.get('/get-deals', async (req, res) => {
    try {
        const response = await axios.get(HUBSPOT_DEAL_URL, {
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`
            }
        });

        res.json({
            success: true,
            total: response.data.total,
            results: response.data.results
        });

    } catch (error) {
        res.json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
