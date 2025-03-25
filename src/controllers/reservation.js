"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Reservation API
------------------------------------------------------- */

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Reservations']
            #swagger.summary = 'List Reservations'
            #swagger.desription = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
    */

    const result = await res.getModelList(Reservation);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      result,
    });
  },

  create: async (req, res) => {
    /* 
        #swagger.tags=["Reservations"]
        #swagger.summary="Create Reservations"
        #swagger.parameters['body']={
            in:"body",
            required:true,
            schema:{
                $ref: '#/definitions/Reservation',
            },
    */

    const passengerInfos = req.body.passengers || [];
    const passengerIds = [];
    let passenger = {};

    for (let passengerInfo of passengerInfos) {
      if (typeof passengerInfo == "object") {
        passenger = await Passenger.findOne({ email: passengerInfo.email });

        if (passenger) {
          passengerIds.push(passenger._id);
        } else {
          // create a new Passenger

          passenger = await Passenger.create({
            ...passengerInfo,
            createdId: req.user._id,
          });

          if (passenger) {
            passengerIds.push(passenger._id);
          }
        }
      } else if (typeof passengerInfo == "string") {
        passenger = await Passenger.findOne({ _id: passengerInfo });
        if (passenger) passengerIds.push(passenger._id);
      }
    }

    req.body.passengers = passengerIds;

    const result = await Reservation.create(req.body);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      result,
    });
  },

  read: async (req, res) => {
    /* 
        #swagger.tags = ['Reservations']
        #swagger.summary = 'Get Single Reservation'
    */

    const result = await Reservation.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
        #swagger.tags = ['Reservations']
        #swagger.summary = 'Update Reservation'
        #swagger.parameters['body']={
            in:"body",
            required:true,
            schema:{
                $ref:'#/definitions/Reservation',
            },
    */

    const result = await Reservation.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );

    if (result.modifiedCount) {
      res.errorStatusCode = 404;
      throw new Error("Data is not updated");
    }

    res.status(202).send({
      error: false,
      new: await Reservation.updateOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /* 
        #swagger.tags = ['Reservations']
        #swagger.summary = 'Delete Reservation'
    */

    const result = await Reservation.deleteOne({ _id: req.params.id });

    res.status(result.deletedCount ? 204 : 404).send({
      error: false,
      result,
      message: "Data is not found or already deleted.",
    });
  },
};
