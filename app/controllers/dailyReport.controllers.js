const DailyReport = require("../models/dailyReport.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const dailyReport = new DailyReport({
      title: req.body.title,
      note: req.body.note,
      createdBy: req.body.createdBy,
   });

   DailyReport.create(dailyReport, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the dailyReport.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   DailyReport.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving dailyReports.",
         });
      else res.send(data);
   });
};

exports.findOneByUserId = (req, res) => {
   DailyReport.findByIdUser(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found dailyReport with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving dailyReport with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   DailyReport.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found dailyReport with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving dailyReport with id " + req.params.id,
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

   DailyReport.updateById(
      req.params.id,
      new DailyReport(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found dailyReport with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating dailyReport with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   DailyReport.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found dailyReport with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete dailyReport with id " + req.params.id,
            });
         }
      } else res.send({ message: `dailyReport was deleted successfully!` });
   });
};
