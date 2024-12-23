const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Database Connected");
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
}

module.exports = mongoDB;