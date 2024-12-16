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
        data-testid="to-do-list"
        itemLayout="horizontal"
        dataSource={props.filterTasks}
        renderItem={(item) => {
          return (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Checkbox
                    title={item.name}
                    checked={!item.isActive}
                    onChange={() => {
                      const copyAllTask: ITasks[] = [...props.allTasks];
                      let index: number = copyAllTask.findIndex(
                        (task) => task.id === item.id
                      );
                      copyAllTask[index].isActive = !item.isActive;
                      props.setAllTasks(copyAllTask);
                    }}
                  />
                }
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
