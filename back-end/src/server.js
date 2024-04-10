require("dotenv").config();
const express = require("express");
const cors = require("cors");
const webRoutes = require("./routes/routes");
const port = process.env.PORT || 3030; //8080
const hostname = process.env.DB_HOST || "localhost";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", webRoutes);
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
