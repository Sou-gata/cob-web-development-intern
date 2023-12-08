const express = require("express");
const cors = require("cors");
const db = require("./config/dbConnect");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

db().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}\n`);
    });
});
app.use("/api", require("./routes/todo.routes"));
