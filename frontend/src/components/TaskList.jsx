
import {
  Check,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2
} from "lucide-react";

function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange
}) {

  // Empty task condition
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white px-6 py-14 text-center">

        <CheckCircle2
          size={35}
          className="mx-auto mb-4 text-indigo-600"
        />

        <h3 className="font-semibold text-slate-800">
          No tasks yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Add your first task and start making progress.
        </p>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      {tasks.map((task) => {

        const isCompleted = task.status === "Completed";

        return (

          <article
            key={task._id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >

            {/* Task Details */}
            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                {isCompleted
                  ? <Check size={18} />
                  : <Circle size={18} />
                }
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="wrap-break-word font-semibold">
                    {task.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

                <p className="mt-2 wrap-break-word text-sm text-slate-500">
                  {task.description || "No description added."}
                </p>

              </div>

            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">

              {/* Status Dropdown */}
              <div className="flex items-center gap-2">

                <span className="text-xs text-slate-500">
                  Status
                </span>

                <select
                  value={task.status}
                  onChange={(e) =>
                    onStatusChange(task._id, e.target.value)
                  }
                  className="rounded-lg border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

              {/* Edit and Delete */}
              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  aria-label="Edit task"
                  className="rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100"
                >
                  <Pencil size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(task._id)}
                  aria-label="Delete task"
                  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </div>

          </article>
        );
      })}

    </div>
  );
}

export default TaskList;
