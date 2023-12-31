require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Corrected the typo here
const port = 4000;
const bodyparser = require('body-parser');
const path = require('path');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Use cookieParser, not cookiParser
app.use(cors());
app.use(router);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);
//app.use('/api/cars', carRoutes);


app.listen(port, () => {
    console.log(`server start at port no : ${port}`);
});
