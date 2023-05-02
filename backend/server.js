const express = require('express');
const app = express();


const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');

const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRoute.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const messengerRouter = require('./routes/messengerRoute.js')


dotenv.config({
    path:'backend/config/config.env'
})

app.use(bodyParser.json());
app.use(cookieParser())
app.use('/api/messengers',authRouter);
app.use('/api/messengers',messengerRouter);

app.get('/', (req,res) => {
    res.send(`<h1>This is from Backend Server</h1>`);
})
databaseConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(__dirname);
})