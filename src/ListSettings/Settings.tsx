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
  const deteteFinishedTasks = () => {
    const copyAllTasks = [...props.allTasks];
    const activeAllTasks = copyAllTasks.filter((task) => task.isActive);
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
        >
          Все
        </Button>
        <Button
          className={props.filter === "Active" ? "activeButton" : ""}
          type="text"
          onClick={() => props.setFilter("Active")}
        >
          Активные
        </Button>
        <Button
          className={props.filter === "Done" ? "activeButton" : ""}
          type="text"
          onClick={() => props.setFilter("Done")}
        >
          Выполненные
        </Button>
      </div>
      <Button
        type="text"
        onClick={() => {
          deteteFinishedTasks();
        }}
      >
        Удалить все выполненные
      </Button>
    </div>
  );
}
