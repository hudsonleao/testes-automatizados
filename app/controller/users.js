module.exports = function (app) {
    let controller = {};
    controller.getUsers = async (req, res) => {
        try {
                
        } catch (error) {
            console.log("error", "controllers - balance - balance - " + error);
            res.status(500).json({
            });
        }
    }
    return controller;
}