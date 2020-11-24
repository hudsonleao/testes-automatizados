let express = require('express');
let consign = require('consign');
let sequelize = require('./sequelize')();

module.exports = function (){
    let app = express();
    app.sequelize = sequelize.getConnection();
    app.use('/', express.static('static'));
    app.use(require('method-override')());
    consign({cwd: 'app', verbose: false})
        .include("models")
        .then("controllers")
        .then("routes")
        .into(app);

    return app;
};