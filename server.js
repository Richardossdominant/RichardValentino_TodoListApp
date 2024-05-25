const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware untuk menangkap IP address
app.use((req, res, next) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const logEntry = `IP: ${userIP}, User-Agent: ${userAgent}, Timestamp: ${new Date().toISOString()}\n`;
    
    fs.appendFile('access_log.txt', logEntry, (err) => {
        if (err) throw err;
    });
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
