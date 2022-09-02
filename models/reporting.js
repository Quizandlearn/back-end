const mongoose = require('mongoose');

const reportingSchema = mongoose.Schema(
  {
    id_user: { type: mongoose.ObjectId, ref: 'User' },
    id_quiz: { type: mongoose.ObjectId, ref: 'Quiz' },
    type: [String],
    status: 'opened' || 'in progress' || 'closed',
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Reporting', reportingSchema);
