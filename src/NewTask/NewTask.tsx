import { Button, Input } from "antd";
import { useState } from "react";
import "./NewTask.css";
import { ITasks } from "../App";

export interface IPropsTask {
  allTasks: ITasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
}

export default function Task(props: IPropsTask) {

  const [value, setValue] = useState<string>("");
  
  const addNewTask = () => {
    if (value.trim() !== "") {
      let copyAllTasks: ITasks[] = [...props.allTasks];
      copyAllTasks.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
        name: value.trim(),
        isActive: true,
      });
      props.setAllTasks(copyAllTasks);
      setValue("");
    }
    console.log(props.allTasks)
  };

  return (
    <div className="task">
      <Input
        type="text"
        placeholder="Что вы хотите сделать?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => addNewTask()} type="primary">
        Добавить
      </Button>
    </div>
  );
}
