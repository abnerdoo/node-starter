const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/Todo/TodoRoutes');
const authRoutes = require('./routes/Auth/AuthRoutes')
const morgan = require('morgan');

const app = express();
connectDB();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));