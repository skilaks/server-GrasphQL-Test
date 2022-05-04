var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require('mongoose');
require('dotenv').config();

var dbConnection  = require('./DAL/base.repo-mongoose')
//routers
var productsRouter = require("./routes/products");
var usersRouter = require("./routes/users");
var dashborderRouter = require("./routes/dashbord")
var  indexRouter = require("./routes/index");
var userGraphQLRouter = require("./routes/graphQL-router/user-router")
var authGraphQLRouter = require("./routes/graphQL-router/auth-router")
//express
var app = express();
//connected to database with mongoose
dbConnection((err, connection)=>{
  if(err) throw err;
  else if(connection)
  console.log('mongoose connected!')
})
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use('/',indexRouter);
app.use("/products", productsRouter);
app.use("/test", indexRouter);
app.use("/users", usersRouter);
app.use("/dashbord",dashborderRouter);
//graphQL route
app.use("/gqlApi/users",userGraphQLRouter);
app.use("/gqlApi/auth",authGraphQLRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
