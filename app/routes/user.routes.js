module.exports = (app) => {
   const User = require("../controllers/user.controllers.js");

   app.post("/api/addUser", User.create);

   app.get("/api/users", User.findAll);

   app.post("/api/login", User.loginUser);

   app.get("/api/user/:id", User.findOne);

   app.get("/api/userRole/:id", User.findOneByRoleId);

   app.put("/api/user/:id", User.update);

   app.delete("/api/user/:id", User.delete);
};
