import { useMemo, useState } from "react";
import "./App.css";
import NewTask from "./NewTask/NewTask";
import ToDoList from "./ToDoList/ToDoList";
import Settings from "./ListSettings/Settings";
export interface ITasks {
  id: string;
  name: string;
  isActive: boolean;
}

const data: ITasks[] = [
  {
    id: "m2swam6s-aq4abp4ynh",
    name: "Написать код",
    isActive: false,
  },
  {
    id: "m2swb1ir-dsy9tvtx8u",
    name: "Протестировать код",
    isActive: true,
  },
  {
    id: "m2swbu15-ko3805bfh7r",
    name: "Запушить код на GitLab",
    isActive: true,
  },
  {
    id: "m2swcely-lo86d37qadj",
    name: "Отправить на проверку",
    isActive: true,
  },
];


function App() {
  const [filterTasks, setFilterTasks] = useState<ITasks[]>(data);
  const [allTasks, setAllTasks] = useState<ITasks[]>(data);
  const [filter, setFilter] = useState<String>("All");
  const [countFinished, setCountFinished] = useState<number>(
    allTasks.filter((task) => !task.isActive).length
  );

  useMemo(() => {
    const currentCount: number = allTasks.filter((task) => !task.isActive).length;
    setCountFinished(currentCount);

    let copyAllTasks: ITasks[] = [...allTasks];
    if (filter === "Done") {
      setFilterTasks(copyAllTasks.filter((task) => !task.isActive));
    } else if (filter === "Active") {
      setFilterTasks(copyAllTasks.filter((task) => task.isActive));
    } else setFilterTasks(copyAllTasks);
  }, [allTasks, filter]);

  return (
    <div className="app">
      <h1 className="title">todos</h1>
      <NewTask allTasks={allTasks} setAllTasks={setAllTasks} />
      <ToDoList
        allTasks={allTasks}
        filterTasks={filterTasks}
        setAllTasks={setAllTasks}
      />
      <Settings
        filterTasks={filterTasks}
        allTasks={allTasks}
        countFinished={countFinished}
        setAllTasks={setAllTasks}
        setFilter={setFilter}
        filter={filter}
      />
    </div>
  );
}

export default App;
