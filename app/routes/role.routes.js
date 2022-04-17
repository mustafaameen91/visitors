module.exports = (app) => {
   const Role = require("../controllers/role.controllers.js");

   app.post("/api/addRole", Role.create);

   app.get("/api/roles", Role.findAll);

   app.get("/api/role/:id", Role.findOne);

   app.post("/api/role/:id", Role.update);

   app.delete("/api/role/:id", Role.delete);
};
