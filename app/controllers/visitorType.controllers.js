const VisitorType = require("../models/visitorType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const visitorType = new VisitorType({
      typeName: req.body.typeName,
   });

   VisitorType.create(visitorType, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the visitorType.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   VisitorType.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving visitorTypes.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   VisitorType.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visitorType with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving visitorType with id " + req.params.id,
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

   VisitorType.updateById(
      req.params.id,
      new VisitorType(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found visitorType with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating visitorType with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   VisitorType.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found visitorType with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete visitorType with id " + req.params.id,
            });
         }
      } else res.send({ message: `visitorType was deleted successfully!` });
   });
};
