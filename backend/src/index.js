const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://rajputmeenakshi982:engineering-task@engineering-task.onzwixz.mongodb.net/engineering-task', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/organization', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
