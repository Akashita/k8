const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static(__dirname + '/public')); // Serve static files from the "public" directory

let collection;

let client = new MongoClient(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  collection = client.db("test").collection("devices");
  client.close();
});

app.get("/tasks", (req, res) => {
  collection.find({}).toArray((err, tasks) => {
    res.json(tasks);
  });
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  collection.insertOne(task, (err, result) => {
    res.json(result);
  });
});

app.get("/", (req, res) => {
    res.sendFile('/app/public/index.html'); // Serve the HTML file
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
