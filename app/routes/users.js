module.exports = function (app) {
    const controller = app.controllers.users;
    app.route('/login')
        .post(controller.login);
    app.route('/api/users')
        .get(controller.getUsers);
    app.route('/api/users/:username')
        .get(controller.getUser);
}