const ReportType = require("../models/reportType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const reportType = new ReportType({
      reportName: req.body.reportName,
   });

   ReportType.create(reportType, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the reportType.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   ReportType.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving reportTypes.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ReportType.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found reportType with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving reportType with id " + req.params.id,
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

   ReportType.updateById(
      req.params.id,
      new ReportType(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found reportType with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message: "Error updating reportType with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ReportType.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found reportType with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete reportType with id " + req.params.id,
            });
         }
      } else res.send({ message: `reportType was deleted successfully!` });
   });
};
