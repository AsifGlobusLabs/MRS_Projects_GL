// controllers/assignmentController.js
const Assignment = require("../models/assignmentModel");


// creating or posting a new assignment 

exports.createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
};


// getting all assignment 

exports.getAllAssignments = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const assignments = await Assignment.find();
      res.send(assignments);
    } else {
      employee_id = req.user.employee_id;
      const assignments = await Assignment.find({
        employee_id: employee_id,
      });
      res.send(assignments);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


// getting all assignment codes

exports.getAssignmentCodes = async (req, res) => {
  try {
    const codes = await Assignment.find().select("code");
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// getting latest assignment codes

exports.getLatestAssignmentCode = async (req, res) => {
  try {
    const latestAssignment = await Assignment.findOne().sort({ task_no: -1 });

    if (!latestAssignment) {
      return res.status(404).json({ message: "No assignments found" });
    }

    res.json({ task_no: latestAssignment.task_no });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// getting latest assignment by employee id

exports.getLatestAssignmentByEmployeeId = async (req, res) => {
  try {
    const latestAssignmentemp = await Assignment.findOne().sort({
      employee_id: -1,
    });

    if (!latestAssignmentemp) {
      return res.status(404).json({ message: "No assignments found" });
    }

    res.json({ employee_id: latestAssignmentemp.employee_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// getting assignment by employee id

exports.getAssignmentDetailsByEmployeeId = async (req, res) => {
  try {
    const employee_id = req.params.employee_id;
    const assignmentDetails = await Assignment.findOne({
      employee_id: employee_id,
    });

    if (!assignmentDetails) {
      return res.status(404).send();
    } else {
      res.send(assignmentDetails);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};


// getting assignment by id

exports.getAssignmentDetailsById = async (req, res) => {
  try {
    const _id = req.params.id;
    const assignmentDetails = await Assignment.findOne({_id: _id});

    if (!assignmentDetails) {
      return res.status(404).send();
    } else {
      res.send(assignmentDetails);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}


// updating assignment 

exports.updateAssignment = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateAssignment = await Assignment.findByIdAndUpdate(
      { _id: _id },
      req.body,
      { new: true },
    );
    res.send(updateAssignment);
  } catch (error) {
    res.status(400).send();
  }
};


// deleting assignment 

exports.deleteAssignment = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteAssignment = await Assignment.findByIdAndDelete({ _id: _id });
    res.send(deleteAssignment);
  } catch (error) {
    res.status(500).send(error);
  }
};


// changing the status to progress 

exports.progressAssignmentStatus = async (req, res) => {
  const task_no = req.params.task_no;

  try {
    console.log(req.user.role);
    if(req.user.role === "user"){
    const assignment = await Assignment.findOne({ task_no: task_no });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Validate the progress value further if needed
    // Add business logic validation here...

    assignment.status = "Progress";
    await assignment.save();

    res.status(200).json(assignment);
  }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// changing the status to Completed

exports.completeAssignmentStatus = async (req, res) => {
  const task_no = req.params.task_no;

  try {
    const assignment = await Assignment.findOne({ task_no: task_no });

    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }

    assignment.status = "Completed"; 
    await assignment.save();

    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};


// getting assignment whose status is Progress 

// exports.getAssignmentStatus = async (req, res) => {
//   try {
//     if (req.user.role === "admin") {
//       const status = await Assignment.find({ status: "Progress" });
//       res.send(status);
//     } else {
//       employee_id = req.user.employee_id;
//       const status = await Assignment.find({
//         employee_id: employee_id,
//         status: "Progress",
//       });
//       res.send(status);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


