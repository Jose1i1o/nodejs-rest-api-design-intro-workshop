const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const {
    json
} = require("body-parser");

const bookRouter = require("./routes/book-routes");
const errorMiddleware = require("./middleware/error-middleware");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use(bookRouter);
app.use(errorMiddleware);

module.exports = app;