import React from "react";
import TaskEdit from "./Edit";
import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-router-dom";

type ListProps = {
  list: [
    {
      id: number;
      title: string;
      description: string;
      completed: string;
    },
  ];
};

export default function TaskList({ list }: ListProps) {
  const handleComplete = (completed: string) => {
    return completed === "true" ? "false" : "true";
  };
  return (
    <div>
      <ul>
        {list?.map((item: any, idx: number) => {
          return (
            <li
              key={idx}
              className="group flex justify-between items-center border-b border-b-gray-200 py-2"
            >
              <span className="flex items-start">
                <Form replace method="post">
                  <input
                    type="text"
                    name="task_id"
                    value={item.id}
                    hidden
                    readOnly
                  />
                  <input
                    type="text"
                    name="task_complete"
                    value={handleComplete(item.completed)}
                    hidden
                    readOnly
                  />
                  <button
                    className={`border-2 ${
                      item.completed === "true"
                        ? "border-red-500 bg-red-300"
                        : "border-blue-500 bg-blue-300"
                    } p-2 rounded-full mx-2 cursor-pointer`}
                    type="submit"
                    name="_type"
                    id="complete_task"
                    value="completeTask"
                  />
                </Form>
                <div>
                  <p
                    className={`${
                      item.completed === "true"
                        ? "decoration-2 line-through"
                        : ""
                    } text-lg`}
                  >
                    {item.title.length > 80
                      ? `${item.title.substring(0, 70)}...`
                      : item.title}
                  </p>
                  <span className="text-sm text-gray-600">
                    {item.description.length > 50
                      ? `${item.description.substring(0, 50)}...`
                      : item.description}
                  </span>
                </div>
              </span>
              <span className="flex space-x-3 invisible group-hover:visible">
                {item.completed === "false" && <TaskEdit taskData={item} />}
                <Form method="post">
                  <input
                    type="text"
                    name="task_id"
                    value={item.id}
                    hidden
                    readOnly
                  />
                  <button type="submit" value="deleteTask" name="_type">
                    <MdDeleteOutline />
                  </button>
                </Form>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
