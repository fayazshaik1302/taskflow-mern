import { useState, useEffect } from "react";

const emptyTask = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
};

function TaskForm({ onSubmit, editingTask }) {
  const [task, setTask] = useState(emptyTask);

  useEffect(() => {
    if (!editingTask) {
      setTask(emptyTask);
      return;
    }

    setTask({
      title: editingTask.title,
      description: editingTask.description,
      priority: editingTask.priority,
      status: editingTask.status,
      dueDate: editingTask.dueDate
        ? editingTask.dueDate.slice(0, 10)
        : "",
    });
  }, [editingTask]);

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(task);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-4">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-3"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            className="form-control mb-3"
            rows="3"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
          />

          <div className="row">
            <div className="col-md-4">
              <select
                className="form-select mb-3"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="form-select mb-3"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="col-md-4">
              <input
                type="date"
                className="form-control mb-3"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;