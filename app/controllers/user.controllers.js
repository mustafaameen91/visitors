const User = require("../models/user.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const user = new User({
      userName: req.body.userName,
      password: req.body.password,
      roleId: req.body.roleId,
   });

   User.create(user, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the user.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   User.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving users.",
         });
      else res.send(data);
   });
};

exports.loginUser = (req, res) => {
   console.log(req.body);
   User.login(req.body, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.body.userName}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user with id " + req.body.userName,
            });
         }
      } else res.send(data);
   });
};

exports.findOneByRoleId = (req, res) => {
   User.findByIdRole(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   User.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.updateVerify = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   User.updateByIdVerify(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   User.updateById(req.params.id, new User(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   User.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete user with id " + req.params.id,
            });
         }
      } else res.send({ message: `user was deleted successfully!` });
   });
};
