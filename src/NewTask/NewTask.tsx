import { Button, Input } from "antd";
import { useState } from "react";
import "./NewTask.css";
import { ITasks } from "../App";

export interface IPropsTask {
  allTasks: ITasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
}
export default function Task(props: IPropsTask) {
  const [value, setValue] = useState("");

  const addNewTask = () => {
    if (value.trim() !== "") {
      let copyAllTasks = [...props.allTasks];
      copyAllTasks.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
        name: value.trim(),
        isActive: true,
      });
      props.setAllTasks(copyAllTasks);
      setValue("");
    }
  };
  return (
    <div className="task">
      <Input
        placeholder="Что вы хотите сделать?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        onClick={() => addNewTask()}
        type="primary"
      >
        Добавить
      </Button>
    </div>
  );
}
