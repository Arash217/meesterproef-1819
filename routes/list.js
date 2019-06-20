const express = require("express");
const listController = require("../controllers/listController");

module.exports.autoroute = {
  get: {
    "/lijsten": listController.get,
    "/lijsten/toevoegen": listController.add
  },

  post: {
    "/lijsten": [express.json(), listController.create]
  },

  delete: {
    "/lijsten": [express.json(), listController.remove]
  }
};
