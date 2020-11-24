module.exports = function (app) {
    let controller = {};
    const Users = app.models.users;

    controller.isValid = async (username, password) => {
        try {
            const user = await Users.findOne({
                where: {
                    username: username,
                    password: password
                }
            });

            if (user) return true

            return false
        } catch (error) {
            console.log(error);
            return false
        }
    }

    controller.login = async (req, res) => {
        try {

            if (!req.body) {
                return res.status(401).json({
                    message: `Username and password cannot be empty`
                });
            }

            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(401).json({
                    message: `Username and password cannot be empty`
                });
            }

            const valid = await controller.isValid(username, password);

            if (valid) {
                return res.status(200).json({
                    message: `Valid user, username: ${username}`
                });
            }
            return res.status(401).json({
                message: `Invalid user, username: ${username}`
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: error
            });
        }
    };

    controller.getUsers = async (req, res) => {
        try {
            const users = await Users.findAll();

            return res.status(200).json({
                data: users
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: error
            });
        }
    }

    controller.getUser = async (req, res) => {
        try {

            if (!req.params) {
                return res.status(401).json({
                    message: `Username cannot be empty`
                });
            }

            const { username } = req.params;

            if (!username ) {
                return res.status(401).json({
                    message: `Username cannot be empty`
                });
            }

            const user = await Users.findOne({
                where: {
                    username: username
                }
            });
            if(user){
                return res.status(200).json({
                    data: user
                });
            }
            return res.status(500).json({
                message: `Invalid username`
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: error
            });
        }
    }

    return controller;
}