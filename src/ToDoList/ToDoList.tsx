import { Checkbox, List } from "antd";
import "./ToDoList.css";
import { ITasks } from "../App";

export interface IPropsList {
  filterTasks: ITasks[];
  allTasks: ITasks[];
  setAllTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
}

export default function ToDoList(props: IPropsList) {
  return (
    <div className="list">
      <List
        itemLayout="horizontal"
        dataSource={props.filterTasks}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <Checkbox
                checked={!item.isActive}
                onClick={() => {
                  const copyAllTask = [...props.allTasks];
                  let index = copyAllTask.findIndex(task => task.id === item.id);
                  copyAllTask[index].isActive = !item.isActive;
                  props.setAllTasks(copyAllTask);
                }}
              />
              <List.Item.Meta
                className={!item.isActive ? "doneTask" : ""}
                description={item.name}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
