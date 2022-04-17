const sql = require("./db.js");

const ReportType = function (reportType) {
   this.reportName = reportType.reportName;
};

ReportType.create = (newReportType, result) => {
   sql.query("INSERT INTO reportType SET ?", newReportType, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created reportType: ", {
         id: res.insertId,
         ...newReportType,
      });
      result(null, { id: res.insertId, ...newReportType });
   });
};

ReportType.getAll = (result) => {
   sql.query("SELECT * FROM reportType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("reportTypes: ", res);
      result(null, res);
   });
};

ReportType.findById = (reportTypeId, result) => {
   sql.query(
      `SELECT * FROM reportType WHERE idReportType = ${reportTypeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found ReportType: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ReportType.updateById = (id, reportType, result) => {
   sql.query(
      "UPDATE reportType SET ? WHERE idReportType = ?",
      [reportType, id],
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

         console.log("updated ReportType: ", { id: id, ...reportType });
         result(null, { id: id, ...reportType });
      }
   );
};

ReportType.remove = (id, result) => {
   sql.query(
      "DELETE FROM reportType WHERE idReportType = ?",
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

         console.log("deleted ReportType with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ReportType;
