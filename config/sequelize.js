let Sequelize = require('sequelize');
module.exports = function() {
    let controller = {};
    controller.getConnection = function() {
        let connection = new Sequelize('testes-automatizados', 'root', '', 
        {
            host: '127.0.0.1',
            dialect: 'mysql',
            reconnect: true,
            logging: false
        });
        return connection;
    };
    return controller;
};