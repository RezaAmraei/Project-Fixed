require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("./config/mongoose.config");

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json(), express.urlencoded({ extended: true }));

require("./routes/user.routes")(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
