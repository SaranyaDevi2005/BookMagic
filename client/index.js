var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://fullstack:sanju5954f@cluster0.dshg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "login";
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) throw error;
        database = client.db(DATABASE_NAME);
        console.log("MONGO DB CONNECTED");
    });
});

app.get('/api/login/getnotes', (request, response) => {
    database.collection("logincollection").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send("Error fetching notes");
            return;
        }
        response.send(result);
    });
});

app.post('/api/login/addnotes', multer().none(), async (request, response) => {
    try {
        const numOfDocs = await database.collection("logincollection").countDocuments({});
        const newNote = {
            Name: request.body.newnotes
        };
        console.log("Inserting note:", newNote);
        await database.collection("logincollection").insertOne(newNote);
        response.json({ message: "Added Successfully" });
    } catch (error) {
        console.error("Error adding note:", error);
        response.status(500).json({ message: "Error adding note" });
    }
});

app.delete('/api/login/deletenotes', async (request, response) => {
    try {
        const idToDelete = request.query.id;
        console.log("Deleting note with id:", idToDelete);
        const result = await database.collection("logincollection").deleteOne({ id: idToDelete });
        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "Note not found" });
        }
        response.json({ message: "Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        response.status(500).json({ message: "Error deleting note" });
    }
});
