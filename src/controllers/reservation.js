"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Reservations']
            #swagger.summary = 'List Reservations'
            #swagger.desription = `
                You can sen query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
    */
    //* swagger'lari kullanabilmek icin(dökümantasyon yazabilmek icin) yorum satirinin icinde #swagger seklinde yazip ici istenildigi gibi doldurulabilir.

    const result = await res.getModelList(Reservation); //* daha detayli islemleri yapabilmek icin getModelList kullanildi.

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      result,
    });
  },

  create: async (req, res) => {
    /* 
        #swagger.tags = ['Reservations']
        #swagger.summary = 'Create Reservation'
    */

    const result = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
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
    */

    const result = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

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
