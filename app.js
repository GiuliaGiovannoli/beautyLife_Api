const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const dotEnv = require('dotenv')
const cors = require('cors')

const app = express();
dotEnv.config()
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoute');
const brandRouter = require('./routes/brandRoute');
const tagRouter = require('./routes/tagRoute');
const orderRouter = require('./routes/orderRoute')
const paymentRouter = require('./routes/paymentRouter')

app.use('/api/auth', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/tags', tagRouter);
app.use('/api/orders', orderRouter)
app.use('/api/payments', paymentRouter)



// configure mongodb connection
mongoose.connect(process.env.MONGO_DB_CLOUD_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((response) => {
    console.log('Connected to MongoDB Cloud Successfully......');
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

module.exports = app;
