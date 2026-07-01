import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (task) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, task);

        toast.success("Task Updated");

        setEditingTask(null);
      } else {
        await createTask(task);

        toast.success("Task Added");
      }

      await fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Operation Failed");
    }
  };

const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this task?"
  );

  if (!confirmDelete) return;

  try {

    await deleteTask(id);

    toast.success("Task Deleted");

    fetchTasks();

  } catch (error) {

    console.log(error);

    toast.error("Delete Failed");

  }

};

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      status === "All" || task.status === status;

    const matchPriority =
      priority === "All" || task.priority === priority;

    return (
      matchSearch &&
      matchStatus &&
      matchPriority
    );
  });

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center fw-bold">
          Task Dashboard
        </h2>

        <p className="text-center text-secondary">
          Manage your daily tasks efficiently
        </p>

        <Stats tasks={tasks} />

        <SearchBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
        />

        <TaskForm
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
        />

        <TaskList
  tasks={filteredTasks}
  onEdit={setEditingTask}
  onDelete={handleDelete}
/>
      </div>
    </>
  );
}

export default App;