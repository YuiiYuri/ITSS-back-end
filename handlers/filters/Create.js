const { createFilter } = require("../../entities/Filters");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/filter", express.json(), async (req, res) => {});

module.exports = r;
