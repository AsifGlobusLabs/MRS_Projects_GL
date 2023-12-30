// models/AssignmentModel.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  task_no : {
    type : String,
    required : true,
    unique : true
  },
  task_details: {
    type : String,
    required : true
  },
  task_given_by: {
    type : String,
    required : true
  },
  employee: {
    type : String,
    required : true
  },
  assign_date:  {
    type : Date,
    required : true
  },
  deadline_date:  {
    type : Date,
    required : true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Progress'],
    default: 'Pending',
    required: true,
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
