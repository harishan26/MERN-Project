// These functions contain the business logic and database operations for each action

const express = require("express");

const router = express.Router(); //Creates a new router object.

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", createTask); // Used for creating a new task

router.get("/", getTasks); //  Used for fetching/reading the list of tasks.

router.put("/:id", updateTask); // (e.g., /123). Used for updating an existing task identified by that ID

router.delete("/:id", deleteTask); //Used for deleting a task identified by that ID

module.exports = router;