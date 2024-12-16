import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";


test("render initial app", () => {
  render(<App />);
  expect(screen.getByText("todos")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Что вы хотите сделать?")
  ).toBeInTheDocument();
  expect(screen.getByRole("button", {name:'Все', pressed: true})).toBeInTheDocument();
  expect(screen.getByTestId("to-do-list")).toBeInTheDocument();
});

test("click checked", () => {
  render(<App />);
  const allTasks = screen.getAllByRole("checkbox", { checked: false });
  const task = allTasks[0];
  fireEvent.click(task);
  expect(task).toBeChecked();
  expect(screen.getAllByRole("checkbox", { checked: false })).toHaveLength(allTasks.length - 1);
});

test("count done tasks", () => {
  render(<App />);
  const countCheckedTasks = screen.getAllByRole("checkbox", { checked: true }).length;
  expect(screen.getByText(`Выполнено задач: ${countCheckedTasks}`, {exact: false})).toBeInTheDocument();
})

test ('add new task', () => {
  render(<App/>);
  expect(screen.queryByText("Сходить в магазин")).not.toBeInTheDocument();
  const inputForNewTask = screen.getByPlaceholderText("Что вы хотите сделать?");
  fireEvent.change(inputForNewTask, {target:{value:"Сходить в магазин"}});
  const buttonAddTask = screen.getByRole('button', {name: "Добавить"});
  fireEvent.click(buttonAddTask);
  expect(screen.getByText("Сходить в магазин")).toBeInTheDocument();
});

test ("change filter", () => {
  render(<App/>);
  const countCheckedTask = screen.getAllByRole("checkbox", { checked: true }).length;
  const countActiveTask = screen.getAllByRole("checkbox", { checked: false }).length;
  const countAllTask = screen.getAllByRole("checkbox").length;
  fireEvent.click(screen.getByRole("button", {name:"Выполненные"}));
  expect(screen.getAllByRole("checkbox")).toHaveLength(countCheckedTask);
  fireEvent.click(screen.getByRole("button", {name:"Активные"}));
  expect(screen.getAllByRole("checkbox")).toHaveLength(countActiveTask);
  fireEvent.click(screen.getByRole("button", {name:"Все"}));
  expect(screen.getAllByRole("checkbox")).toHaveLength(countAllTask);
})

test ("delete all checked task", () => {
  render(<App/>);
  const buttonDelete = screen.getByRole('button', {name: "Удалить все выполненные"});
  fireEvent.click(buttonDelete);
  expect(screen.queryByRole("checkbox", {checked:true})).not.toBeInTheDocument()
})