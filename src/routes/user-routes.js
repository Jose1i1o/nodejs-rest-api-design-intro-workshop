const Router = require("express").Router;

const userController = require("../controllers/user-controller");
const authMiddleware = require("../middleware/auth-middleware");

const UserRouter = Router();

UserRouter.use(authMiddleware); // It is the same than specifying it for each request. I.e. UserRouter.get("/", authMiddleware, userController.getUsers);

UserRouter.get("/users", userController.getUsers);
UserRouter.get("/:userId", userController.getUserDetails);
UserRouter.post("/", userController.createUser);
UserRouter.patch("/:userId", userController.updateUser);
UserRouter.delete("/:userId", userController.deleteUser);

module.exports = UserRouter;