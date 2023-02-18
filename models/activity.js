const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: Object,
    
  }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
