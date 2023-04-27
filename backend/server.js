const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const databaseConnect = require('./config/database');
const dotenv = require('dotenv');

dotenv.config({
    path:'backend/config/config.env'
})

app.get('/', (req,res) => {
    res.send(`<h1>This is from Backend Server</h1>`);
})
databaseConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})