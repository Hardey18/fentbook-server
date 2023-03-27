import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from "cors"
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import userRouter from './routes/user';
import categoryRouter from './routes/category';
import productRouter from './routes/product';
import customerRouter from './routes/customer';
import invoiceRouter from './routes/invoice';
import transactionRouter from './routes/transaction';

const app = express();
dotenv.config();
const mongoURI = "mongodb+srv://dbnurudeen:nurudeen992@cluster0.89qyi.mongodb.net/fentbooks"

mongoose.connect(mongoURI)
  .then((result) => {
    console.log(`Database connected successfully`)
  })
  .catch((error) => {
    console.log(error)
  })

// view engine setup
app.set('views', path.join(__dirname, "..", 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/invoice', invoiceRouter);
app.use('/api/v1/transaction', transactionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
