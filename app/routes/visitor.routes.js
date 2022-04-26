module.exports = (app) => {
   const Visitor = require("../controllers/visitor.controllers.js");

   app.post("/api/addVisitor", Visitor.create);

   app.get("/api/visitors", Visitor.findAll);

   app.get("/api/statistics", Visitor.statistics);

   app.get("/api/visitor/:id", Visitor.findOne);

   app.get("/api/typeVisitor/:id", Visitor.findOneByVisitorType);

   app.put("/api/visitor/:id", Visitor.update);

   app.put("/api/updateVisitorExit/:id", Visitor.updateExit);

   app.put("/api/updateVisitorEnter/:id", Visitor.updateEntered);

   app.delete("/api/visitor/:id", Visitor.delete);
};
