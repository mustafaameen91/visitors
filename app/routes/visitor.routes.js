module.exports = (app) => {
   const Visitor = require("../controllers/visitor.controllers.js");

   app.post("/api/addVisitor", Visitor.create);

   app.get("/api/visitors", Visitor.findAll);

   app.get("/api/visitor/:id", Visitor.findOne);

   app.post("/api/visitor/:id", Visitor.update);

   app.delete("/api/visitor/:id", Visitor.delete);
};
