import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onEdit,
  onDelete,
}) {

  if (tasks.length === 0) {
    return (
      <div className="alert alert-info mt-4">
        No Tasks Found
      </div>
    );
  }

  return (
    <div className="mt-4">

      {tasks.map((task) => (

        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
}

export default TaskList;