const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    const dbUrl = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/todos`;

    try {
        await mongoose.connect(dbUrl, {});

        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;