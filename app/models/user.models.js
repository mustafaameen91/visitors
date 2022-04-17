const sql = require("./db.js");

const User = function (user) {
   this.userName = user.userName;
   this.password = user.password;
   this.roleId = user.roleId;
};

User.create = (newUser, result) => {
   sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created user: ", {
         id: res.insertId,
         ...newUser,
      });
      result(null, { id: res.insertId, ...newUser });
   });
};

User.getAll = (result) => {
   sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("users: ", res);
      result(null, res);
   });
};

User.login = (credentials, result) => {
   sql.query(
      `SELECT * ,(select json_arrayagg(json_object('martyrDue', martyrDue.dueTypeId,'userId' , martyrDue.userId)) from martyrDue JOIN dueType ON dueType.idDueType = martyrDue.dueTypeId WHERE martyrDue.userId = user.idUser) AS martyrDue ,(select json_arrayagg(json_object('woundedDue', woundedDue.dueTypeId,'dueName' , dueType.dueName)) from woundedDue JOIN dueType ON dueType.idDueType = woundedDue.dueTypeId  WHERE woundedDue.userId = user.idUser) AS woundedDue FROM user WHERE userName = '${credentials.userName}' AND password = '${credentials.password}' AND verified = 1`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

User.findByIdRole = (roleId, result) => {
   sql.query(`SELECT * FROM user WHERE roleId = ${roleId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }
      result(null, res);
   });
};

User.findById = (userId, result) => {
   sql.query(`SELECT * FROM user WHERE idUser = ${userId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found User: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

User.updateByIdVerify = (id, result) => {
   sql.query(
      `UPDATE user SET verified = 1  WHERE idUser = ${id}`,
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

         console.log("updated User: ", { id: id });
         result(null, { id: id });
      }
   );
};

User.updateById = (id, user, result) => {
   sql.query("UPDATE user SET ? WHERE idUser = ?", [user, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated User: ", { id: id, ...user });
      result(null, { id: id, ...user });
   });
};

User.remove = (id, result) => {
   sql.query("DELETE FROM user WHERE idUser = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted User with id: ", id);
      result(null, res);
   });
};

module.exports = User;
