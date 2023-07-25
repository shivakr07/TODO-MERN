const express = require("express");
const cors = require('cors');

const connectDB = require('./mongodb');
const todoRoute = require('./routes/todoRoute');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', todoRoute);

app.listen(PORT, () => {
    console.log('server started at port ',PORT);
}) 