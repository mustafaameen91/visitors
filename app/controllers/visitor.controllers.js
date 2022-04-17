const Visitor = require("../models/visitor.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const visitor = new Visitor({
      visitorName: req.body.visitorName,
      isEntered: req.body.isEntered,
      visitorTypeId: req.body.visitorTypeId,
      enteredBy: req.body.enteredBy,
      createdBy: req.body.createdBy,
   });

   Visitor.create(visitor, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the visitor.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Visitor.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving visitors.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Visitor.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visitor with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving visitor with id " + req.params.id,
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

   Visitor.updateById(req.params.id, new Visitor(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visitor with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating visitor with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Visitor.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visitor with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete visitor with id " + req.params.id,
            });
         }
      } else res.send({ message: `visitor was deleted successfully!` });
   });
};
