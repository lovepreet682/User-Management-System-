require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const mongoDB = require('./db/dbConnection')
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 7000;

// start DB
mongoDB();

// Add to user router
const userRouter = require('./routers/userRouter');
app.use("/", userRouter);

app.listen(port, () => {
    console.log(`listening on ${port}`);
});