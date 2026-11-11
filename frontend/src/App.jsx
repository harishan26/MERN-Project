
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDashed,
  ListTodo,
  Plus,
  Sparkles
} from "lucide-react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/taskService";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setError("");

      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when application starts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Calculate dashboard counts
  const completedCount = useMemo(
    () => tasks.filter(
      task => task.status === "Completed"
    ).length,
    [tasks]
  );

  const pendingCount = tasks.length - completedCount;

  // Create or update task
  const handleSubmit = async (taskData) => {
    try {
      setError("");

      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }

      await fetchTasks();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await deleteTask(id);

      if (editingTask?._id === id) {
        setEditingTask(null);
      }

      await fetchTasks();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to delete task"
      );
    }
  };

  // Update task status
  const handleStatusChange = async (id, status) => {
    try {
      setError("");

      await updateTask(id, { status });

      await fetchTasks();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to update status"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Dashboard Header */}
        <header className="mb-8 rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10 text-white shadow-xl">

          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={16} />
            <span className="text-xs tracking-wide">
              YOUR PERSONAL WORKSPACE
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            Task Manager
          </h1>

          <p className="mt-2 text-slate-300">
            Plan your day, stay focused, and manage your tasks.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <ListTodo size={25} />
            <span className="text-2xl font-bold">
              {tasks.length}
            </span>
            <span className="text-slate-300">
              Total Tasks
            </span>
          </div>

        </header>

        {/* Dashboard Summary */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <ListTodo className="text-indigo-600" size={25} />

            <p className="mt-3 text-sm text-slate-500">
              Total Tasks
            </p>

            <h2 className="text-3xl font-bold">
              {tasks.length}
            </h2>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <CircleDashed className="text-amber-600" size={25} />

            <p className="mt-3 text-sm text-slate-500">
              Pending Tasks
            </p>

            <h2 className="text-3xl font-bold text-amber-600">
              {pendingCount}
            </h2>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <CheckCircle2 className="text-emerald-600" size={25} />

            <p className="mt-3 text-sm text-slate-500">
              Completed Tasks
            </p>

            <h2 className="text-3xl font-bold text-emerald-600">
              {completedCount}
            </h2>
          </div>

        </section>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </div>
        )}

        {/* Task Form */}
        <section className="mb-8">

          <h2 className="mb-4 text-xl font-bold">
            {editingTask ? "Update Task" : "Create a Task"}
          </h2>

          <TaskForm
            onSubmit={handleSubmit}
            editingTask={editingTask}
            cancelEdit={() => setEditingTask(null)}
          />

        </section>

        {/* Task List */}
        <section>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              My Tasks
            </h2>

            <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
              Total: {tasks.length}
            </span>
          </div>

          {loading ? (
            <p className="py-10 text-center text-slate-500">
              Loading tasks...
            </p>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}

        </section>

      </div>

    </main>
  );
}

export default App;
