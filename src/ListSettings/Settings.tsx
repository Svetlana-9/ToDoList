import { Button } from "antd";
import { ITasks } from "../App";
import "./Settings.css";

interface IPropsSettings {
  filterTasks: ITasks[];
  allTasks: ITasks[];
  countFinished: number;
  filter: String;
  setAllTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
  setFilter: React.Dispatch<React.SetStateAction<String>>;
}
export default function Settings(props: IPropsSettings) {
  
  const deleteFinishedTasks = () => {
    const copyAllTasks: ITasks[] = [...props.allTasks];
    const activeAllTasks: ITasks[] = copyAllTasks.filter(
      (task) => task.isActive
    );
    props.setAllTasks(activeAllTasks);
  };

  return (
    <div className="settings">
      <p className="count">Выполнено задач: {props.countFinished}</p>
      <div className="filters">
        <Button
          className={props.filter === "All" ? "activeButton" : ""}
          type="text"
          onClick={() => props.setFilter("All")}
          aria-pressed={props.filter === "All"}
        >
          Все
        </Button>
        <Button
          className={props.filter === "Active" ? "activeButton" : ""}
          type="text"
          onClick={() => props.setFilter("Active")}
          aria-pressed={props.filter === "Active"}
        >
          Активные
        </Button>
        <Button
          className={props.filter === "Done" ? "activeButton" : ""}
          type="text"
          onClick={() => props.setFilter("Done")}
          aria-pressed={props.filter === "Done"}
        >
          Выполненные
        </Button>
      </div>
      <Button
        type="text"
        onClick={() => {
          deleteFinishedTasks();
        }}
      >
        Удалить все выполненные
      </Button>
    </div>
  );
}
