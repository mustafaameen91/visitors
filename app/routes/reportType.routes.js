module.exports = (app) => {
   const ReportType = require("../controllers/reportType.controllers.js");

   app.post("/api/addReportType", ReportType.create);

   app.get("/api/reportTypes", ReportType.findAll);

   app.get("/api/reportType/:id", ReportType.findOne);

   app.post("/api/reportType/:id", ReportType.update);

   app.delete("/api/reportType/:id", ReportType.delete);
};
