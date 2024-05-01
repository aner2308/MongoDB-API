//Länkar alla program
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Initiera express
const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//Connect to MongoDB
mongoose.connect(MONGOURL).then(() => {
    console.log("Ansluten till MongoDB databasen...");
}).catch((error) => {
    console.log("Error vid koppling till databasen: " + error)
});

//Route för att hämta data från API
app.get("/api", async (req, res) => {
    res.json({ message: "Välkommen till mitt API" });
});

app.listen(PORT, () => {
    console.log(`Servern är startad på port ${PORT}.`);
});