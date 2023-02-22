const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const AxiosParamsObject = require("./classes/AxiosParamsObject");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

require("dotenv").config();

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
  // Remove any trailing slash from base url
  const endpoint =
    process.env.API_BASE_URL.replace(/\/$/, "") + req.params.endpoint;

  const paramsObj = new AxiosParamsObject();
  paramsObj.addParamsFromRequest(req);

  axios
    .put(endpoint, {
      params: paramsObj.getParams(req),
      withCredentials: true,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(3000);
