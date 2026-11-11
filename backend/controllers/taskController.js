// taskcontroll a CRUD operation
const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        message: "Task title must contain at least 3 characters"
      });
    }
// Duplicate Check
    const existingTask = await Task.findOne({
      title: title.trim()
    });

//Handling Duplicates
    if (existingTask) {
      return res.status(409).json({
        message: "Task already exists!"
      });
    }

//Creating the Record
    const task = await Task.create({
      title,
      description
    });

//Sending the Success Response 
    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {  // Duplicate Key Error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate task title!"   //human-readable error message
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};


// READ ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({
      createdAt: -1
    });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const updateData = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length < 3) {
        return res.status(400).json({
          message: "Task title must contain at least 3 characters"
        });
      }

      updateData.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          message: "Invalid description"
        });
      }

      updateData.description = description.trim();
    }

    if (status !== undefined) {
      if (!["Pending", "Completed"].includes(status)) {
        return res.status(400).json({
          message: "Invalid task status"
        });
      }

      updateData.status = status;
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Another task already uses this title!"
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};