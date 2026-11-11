
import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

function TaskForm({ onSubmit, editingTask, cancelEdit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load selected task when editing
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      alert("Title must contain at least 3 characters");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim()
    });

    if (!editingTask) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr_auto] lg:items-end">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Task Title *
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {title.length}/100
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Description (Optional)
          </label>

          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={1}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {description.length}/500
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 lg:pb-6">

          <button
            type="submit"
            className="flex min-h-12 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            {editingTask ? <Save size={17} /> : <Plus size={17} />}

            {editingTask ? "Save Changes" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex min-h-12 items-center gap-2 rounded-xl border px-4 py-3 text-slate-600 hover:bg-slate-50"
            >
              <X size={16} />
              Cancel
            </button>
          )}

        </div>

      </div>
    </form>
  );
}

export default TaskForm;
