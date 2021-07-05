const express = require('express');
var process = require('process');

let routes = require('./items.js')

const app = express();

app.use(express.json());
app.use('/items', routes);
app.use(express.urlencoded({ extended: true }));

/** 404 error handler */
app.use(function(req, res, next) {
    console.log("Not Found. Status code: 404")
    console.error(this.stack)
});

/** general error handler */
app.use(function(err, req, res, next) {
    res.status(err.status || 500)

    return res.json({
        error: err.message,
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000 @ http://127.0.0.1:3000/")
});

module.exports = app