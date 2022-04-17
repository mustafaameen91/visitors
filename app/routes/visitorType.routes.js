module.exports = (app) => {
   const VisitorType = require("../controllers/visitorType.controllers.js");

   app.post("/api/addVisitorType", VisitorType.create);

   app.get("/api/visitorTypes", VisitorType.findAll);

   app.get("/api/visitorType/:id", VisitorType.findOne);

   app.post("/api/visitorType/:id", VisitorType.update);

   app.delete("/api/visitorType/:id", VisitorType.delete);
};
