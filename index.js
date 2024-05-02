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

//Jobbschema
const JobbSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Du måste skicka med företagsnamn."]
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste skicka med jobbtitel."]
    },
    location: {
        type: String,
        required: [true, "Du måste skicka med platsen för arbetet."]
    },
    description: {
        type: String,
        required: false
    },
})

const Job = mongoose.model("Job", JobbSchema);

//Route för att hämta data från API
app.get("/api", async (req, res) => {
    res.json({ message: "Välkommen till mitt API" });
});

app.listen(PORT, () => {
    console.log(`Servern är startad på port ${PORT}.`);
});

//GET för att hämta alla jobb från databasen/API
app.get("/jobs", async(req, res) => {
    try {
        let result = await Job.find({});

        return res.json(result);
    } catch {
        return res.status(500).json({ message: "Det uppstod ett fel vid inhämtning av jobbposter.", error: error });
    }
})

//POST för att lägga till nytt jobb till databasen/API
app.post("/jobs", async(req, res) => {
    try {
        let result = await Job.create(req.body);

        return res.json(result);
    } catch {
        return res.status(400).json({ message: "Det uppstod ett fel vid tilläggning av jobbposten.", error: error });
    }
})

// PUT för att uppdatera en befintlig jobbpost
app.put("/jobs/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = req.body;

        const result = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });

        return res.json(result);
    } catch (error) {
        return res.status(400).json({ message: "Det uppstod ett fel vid uppdatering av jobbposten.", error: error });
    }
});

// DELETE för att ta bort en befintlig jobbpost
app.delete("/jobs/:id", async (req, res) => {
    try {
        const jobId = req.params.id;

        const result = await Job.findByIdAndDelete(jobId);

        if (!result) {
            return res.status(404).json({ message: "Jobbposten hittades inte." });
        }

        return res.json({ message: "Jobbposten har tagits bort." });
    } catch (error) {
        return res.status(400).json({ message: "Det uppstod ett fel vid borttagning av jobbposten.", error: error });
    }
});