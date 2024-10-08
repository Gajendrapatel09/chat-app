const express = require ("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB connection Successfull ");
})
.catch((err) => {
    console.log("err.message");
});

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on PORT ${process.env.PORT}`);
});