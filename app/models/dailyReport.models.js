const sql = require("./db.js");

const DailyReport = function (dailyReport) {
   this.title = dailyReport.title;
   this.note = dailyReport.note;
   this.createdBy = dailyReport.createdBy;
};

DailyReport.create = (newDailyReport, result) => {
   sql.query("INSERT INTO dailyReport SET ?", newDailyReport, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created dailyReport: ", {
         id: res.insertId,
         ...newDailyReport,
      });
      result(null, { id: res.insertId, ...newDailyReport });
   });
};

DailyReport.getAll = (result) => {
   sql.query(
      "SELECT * , DATE_FORMAT(dailyReport.createdAt,'%d/%m/%Y') AS createdAtFormatter FROM dailyReport JOIN user  ON user.idUser = dailyReport.createdBy",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("dailyReports: ", res);
         result(null, res);
      }
   );
};

DailyReport.findByIdUser = (userId, result) => {
   sql.query(
      `SELECT * , DATE_FORMAT(dailyReport.createdAt,'%d/%m/%Y') AS createdAtFormatter FROM dailyReport JOIN user  ON user.idUser = dailyReport.createdBy  WHERE createdBy = ${userId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found DailyReport: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

DailyReport.findById = (dailyReportId, result) => {
   sql.query(
      `SELECT * FROM dailyReport WHERE idDailyReport = ${dailyReportId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found DailyReport: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

DailyReport.updateById = (id, dailyReport, result) => {
   sql.query(
      "UPDATE dailyReport SET ? WHERE idDailyReport = ?",
      [dailyReport, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated DailyReport: ", { id: id, ...dailyReport });
         result(null, { id: id, ...dailyReport });
      }
   );
};

DailyReport.remove = (id, result) => {
   sql.query(
      "DELETE FROM dailyReport WHERE idDailyReport = ?",
      id,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted DailyReport with id: ", id);
         result(null, res);
      }
   );
};

module.exports = DailyReport;
