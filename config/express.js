const express = require('express');
const consign = require('consign');
const sequelize = require('./sequelize')();
const bodyParser = require('body-parser');


module.exports = function () {
    let app = express();
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.sequelize = sequelize.getConnection();
    app.use('/', express.static('static'));
    app.use(require('method-override')());
    consign({ cwd: 'app', verbose: false })
        .include("models")
        .then("controllers")
        .then("routes")
        .into(app);

    return app;
};