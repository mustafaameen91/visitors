module.exports = (app) => {
   const DailyReport = require("../controllers/dailyReport.controllers.js");

   app.post("/api/addDailyReport", DailyReport.create);

   app.get("/api/dailyReports", DailyReport.findAll);

   app.get("/api/dailyReport/:id", DailyReport.findOne);

   app.post("/api/dailyReport/:id", DailyReport.update);

   app.delete("/api/dailyReport/:id", DailyReport.delete);
};
