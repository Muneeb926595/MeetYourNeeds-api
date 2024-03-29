const express = require("express");
const config = require("config");
require("express-async-errors");
const path = require("path");

const errorController = require("./controllers/error");
const routes = require("./routes");
const DBConnection = require("./startup/dbConnection");
const errors = require("./middleware/errors");
const http = require("http");

DBConnection();
const app = express();
require("./startup/prod")(app);
app.use(express.json());

app.use("/api/images", express.static(path.join(__dirname, "/public/uploads")));
app.use(
  "/api/videos",
  express.static(path.join(__dirname, "/public/uploads/videos"))
);
app.use("/api", routes);
app.use(errors);
app.use(errorController.get404);

const port = process.env.PORT || config.get("port");
var httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log("[ Http server running at port ] ", port);
});
