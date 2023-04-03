import { insertDataInDB } from "./indexDB";
import { getProjects, createProject } from "./project";
import { completeTask, createTask, deleteTask, editTask } from "./task";

describe("Task functions", () => {
  beforeAll(async () => {
    await insertDataInDB();
    await createProject({ id: "abc", project_name: "Project Test" });
  });

  it("creates a task", async () => {
    const response = await createTask({
      project_id: "abc",
      task: {
        id: 123,
        title: "Task 1",
        description: "Task Description 1",
        completed: "false",
      },
    });
    expect(response.tasks.length).toBe(1);
    expect(response.tasks[0].title).toBe("Task 1");
  });

  it("edits a task", async () => {
    const response = await editTask({
      project_id: "abc",
      task_data: {
        edit_id: 123,
        edit_title: "Task Test",
        edit_description: "Edited Task",
      },
    });
    expect(response.tasks[0].title).toBe("Task Test");
    expect(response.tasks[0].description).toBe("Edited Task");
  });

  it("task complete/incomplete", async () => {
    const completedResponse = await completeTask({
      project_id: "abc",
      task_data: { id: 123, completed: "true" },
    });
    expect(completedResponse.tasks[0].completed).toBeTruthy();

    const incompleteResponse = await completeTask({
      project_id: "abc",
      task_data: { id: 123, completed: "false" },
    });
    expect(incompleteResponse.tasks[0].completed).toEqual("false");
    expect(incompleteResponse.tasks[0].completed).not.toEqual("true");
  });

  it("deletes a task", async () => {
    const response = await deleteTask({ project_id: "abc", task_id: 123 });
    expect(response.tasks.length).toBe(0);
  });
});
