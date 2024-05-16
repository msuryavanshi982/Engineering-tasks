const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }]
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
