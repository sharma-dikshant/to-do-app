import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "./services/api";
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(
          API_ROUTES.TASK.ALL_TASK_OF_LIST("6872920744e1f441d3b23dca"),
          {
            withCredentials: true,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks();
  }, []);

  return <div>RSO Keep</div>;
}

export default App;
