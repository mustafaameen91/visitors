const sql = require("./db.js");

const Visitor = function (visitor) {
   this.visitorName = visitor.visitorName;
   this.isEntered = visitor.isEntered;
   this.visitorTypeId = visitor.visitorTypeId;
   this.enteredBy = visitor.enteredBy;
   this.createdBy = visitor.createdBy;
   this.sectionName = visitor.sectionName;
   this.exitTime = visitor.exitTime;
   this.enterTime = visitor.enterTime;
   this.isExit = visitor.isExit;
   this.visitCause = visitor.visitCause;
};

Visitor.create = (newVisitor, result) => {
   sql.query("INSERT INTO visitor SET ?", newVisitor, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created visitor: ", {
         id: res.insertId,
         ...newVisitor,
      });
      result(null, { id: res.insertId, ...newVisitor });
   });
};

Visitor.getStatistics = (result) => {
   sql.query(
      "SELECT (SELECT COUNT(idVisitor) FROM visitor WHERE visitorTypeId = 1) AS visitors , (SELECT COUNT(idVisitor) FROM visitor WHERE visitorTypeId = 2) AS guests ,(SELECT COUNT(idVisitor) FROM visitor WHERE visitorTypeId = 2 AND isEntered = 0) AS watinig ,(SELECT COUNT(idDailyReport) FROM dailyReport ) AS reports FROM `visitor` LIMIT 1",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("visitors: ", res);
         result(null, res[0]);
      }
   );
};

Visitor.getAll = (result) => {
   sql.query(
      "SELECT * , DATE_FORMAT(visitor.createdAt,'%d/%m/%Y') AS createdAtFormatter FROM visitor JOIN visitorType JOIN user ON visitor.visitorTypeId = visitorType.idVisitorType AND user.idUser = visitor.enteredBy",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("visitors: ", res);
         result(null, res);
      }
   );
};

Visitor.findByIdOfVisitorType = (visitorTypeId, result) => {
   sql.query(
      `SELECT * , DATE_FORMAT(visitor.createdAt,'%d/%m/%Y') AS createdAtFormatter FROM visitor JOIN visitorType JOIN user ON visitor.visitorTypeId = visitorType.idVisitorType AND user.idUser = visitor.enteredBy WHERE visitorTypeId = ${visitorTypeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length > 0) {
            console.log("found Visitor: ", res);
            result(null, res);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Visitor.findById = (visitorId, result) => {
   sql.query(
      `SELECT * FROM visitor WHERE idVisitor = ${visitorId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found Visitor: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Visitor.updateByIdForExit = (id, exitTime, result) => {
   sql.query(
      `UPDATE visitor SET exitTime = ' ${exitTime} ' , isExit = 1 WHERE idVisitor = ${id}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated Visitor: ", { id: id });
         result(null, { id: id });
      }
   );
};

Visitor.updateByIdForEnter = (id, enterTime, result) => {
   sql.query(
      `UPDATE visitor SET enterTime = ' ${enterTime} ' , isEntered = 1 WHERE idVisitor = ${id}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated Visitor: ", { id: id });
         result(null, { id: id });
      }
   );
};

Visitor.updateById = (id, visitor, result) => {
   sql.query(
      "UPDATE visitor SET ? WHERE idVisitor = ?",
      [visitor, id],
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

         console.log("updated Visitor: ", { id: id, ...visitor });
         result(null, { id: id, ...visitor });
      }
   );
};

Visitor.remove = (id, result) => {
   sql.query("DELETE FROM visitor WHERE idVisitor = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted Visitor with id: ", id);
      result(null, res);
   });
};

module.exports = Visitor;
