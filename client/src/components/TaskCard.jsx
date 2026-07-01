import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";

function TaskCard({ task, onEdit, onDelete }) {
  const priorityColor = {
    High: "danger",
    Medium: "warning",
    Low: "success",
  };

  const statusColor = {
    Pending: "secondary",
    Completed: "success",
  };

  const borderColor = {
    High: "#dc3545",
    Medium: "#ffc107",
    Low: "#198754",
  };

  return (
    <div
      className="card shadow-sm mb-4"
      style={{
        borderLeft: `6px solid ${borderColor[task.priority]}`,
        transition: "0.3s",
      }}
    >
      <div className="card-body">

        <div className="d-flex justify-content-between">

          <div style={{ flex: 1 }}>

            <h4 className="fw-bold mb-2">
              {task.title}
            </h4>

            <p className="text-secondary mb-3">
              {task.description}
            </p>

            <div className="d-flex gap-2 mb-3">

              <span className={`badge bg-${statusColor[task.status]} px-3 py-2`}>
                {task.status}
              </span>

              <span className={`badge bg-${priorityColor[task.priority]} px-3 py-2`}>
                {task.priority}
              </span>

            </div>

            <small className="text-muted">
              <FaCalendarAlt className="me-2" />
              Due:
              {" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </small>

          </div>

          <div className="d-flex flex-column gap-2 ms-3">

            <button
              className="btn btn-warning rounded-circle"
              style={{ width: 42, height: 42 }}
              onClick={() => onEdit(task)}
            >
              <FaEdit />
            </button>

            <button
              className="btn btn-danger rounded-circle"
              style={{ width: 42, height: 42 }}
              onClick={() => onDelete(task._id)}
            >
              <FaTrash />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TaskCard;