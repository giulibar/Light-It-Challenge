const express = require("express");
const patientRoutes = require('./routes/patient.routes');
const errorHandler = require("./middlewares/errorHandler");
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const filesPath = path.resolve(__dirname, '../files');
console.log('Serving files from:', filesPath);
app.use('/files', express.static(filesPath));


app.get("/", (req, res) => {
    res.send("Working API!");
});

app.use('/api/patients', patientRoutes);

app.use(errorHandler);

module.exports = app;
