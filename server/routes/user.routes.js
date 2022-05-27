const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.get("/api/users", UserController.findAll);
  app.get("/api/users/:id", UserController.findOne);
  app.put("/api/users/:id", UserController.update);
  app.post("/api/users", UserController.register);
  app.delete("/api/users/:id", UserController.delete);
  app.post("/api/login", UserController.login);
};
