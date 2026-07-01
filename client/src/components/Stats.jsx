function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pending = total - completed;
  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <>
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-primary border-4">
            <div className="card-body">
              <h5>Total Tasks</h5>
              <h1>{total}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-warning border-4">
            <div className="card-body">
              <h5>Pending</h5>
              <h1>{pending}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-success border-4">
            <div className="card-body">
              <h5>Completed</h5>
              <h1>{completed}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-start border-danger border-4">
            <div className="card-body">
              <h5>High Priority</h5>
              <h1>{high}</h1>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <div className="d-flex justify-content-between mb-2">
            <strong>Task Completion</strong>
            <strong>{percentage}%</strong>
          </div>

          <div className="progress" style={{ height: "12px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${percentage}%` }}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Stats;