const sql = require("./db.js");

const VisitorType = function (visitorType) {
   this.typeName = visitorType.typeName;
};

VisitorType.create = (newVisitorType, result) => {
   sql.query("INSERT INTO visitorType SET ?", newVisitorType, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created visitorType: ", {
         id: res.insertId,
         ...newVisitorType,
      });
      result(null, { id: res.insertId, ...newVisitorType });
   });
};

VisitorType.getAll = (result) => {
   sql.query("SELECT * FROM visitorType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("visitorTypes: ", res);
      result(null, res);
   });
};

VisitorType.findById = (visitorTypeId, result) => {
   sql.query(
      `SELECT * FROM visitorType WHERE idVisitorType = ${visitorTypeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found VisitorType: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

VisitorType.updateById = (id, visitorType, result) => {
   sql.query(
      "UPDATE visitorType SET ? WHERE idVisitorType = ?",
      [visitorType, id],
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

         console.log("updated VisitorType: ", { id: id, ...visitorType });
         result(null, { id: id, ...visitorType });
      }
   );
};

VisitorType.remove = (id, result) => {
   sql.query(
      "DELETE FROM visitorType WHERE idVisitorType = ?",
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

         console.log("deleted VisitorType with id: ", id);
         result(null, res);
      }
   );
};

module.exports = VisitorType;
