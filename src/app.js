const express = require("express");
const routes = require("./routes");
require("./db");

const app = express();
app.use(express.json());
app.use("/", routes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
