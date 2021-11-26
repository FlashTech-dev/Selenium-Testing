/** @format */
const express = require('express');
const dotenv = require('dotenv');
const usersRoute = require('./routes/usersRoute');
const error = require('./middlewares/errorMiddlewareHandler');
const bookRouter = require('./routes/bookRoutes');
const cors = require('cors');

dotenv.config();
require('./config/dbConnect')();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', usersRoute);
app.use('/api/books', bookRouter);
console.log(process.env.MY_NAME);

app.use(error.errorMiddlewareHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// karan
// nzFCfH1RRkDJUMZy