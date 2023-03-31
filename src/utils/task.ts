import { withProjectDB } from "./indexDB";

interface CreateTaskType {
  project_id: string;
  task: {
    id: number;
    title: string;
    description: string;
    completed: string;
  };
}

export async function createTask({ project_id, task }: CreateTaskType) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    project?.tasks.push({
      id: task.id,
      title: task.title,
      description: task.description || "",
      completed: task.completed,
    });
    await tx.store.put(project);
    return await tx.store.get(project_id);
  });
}

export async function deleteTask({
  project_id,
  task_id,
}: {
  project_id: string;
  task_id: number;
}) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    await tx.store.put({
      ...project,
      tasks: project.tasks.filter((task: any) => task.id != task_id),
    });
    return await tx.store.get(project_id);
  });
}

interface EditTaskType {
  project_id: string;
  task_data: {
    edit_id: number;
    edit_description: string;
    edit_title: string;
  };
}
export async function editTask({ project_id, task_data }: EditTaskType) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    await tx.store.put({
      ...project,
      tasks: project.tasks.map((task: any) => {
        if (task.id === task_data.edit_id) {
          task.description = task_data.edit_description;
          task.title = task_data.edit_title;
        }
        return task;
      }),
    });
    return await tx.store.get(project_id);
  });
}

interface CompleteTaskType {
  project_id: string;
  task_data: {
    id: number;
    completed: string;
  };
}
export async function completeTask({
  project_id,
  task_data,
}: CompleteTaskType) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    await tx.store.put({
      ...project,
      tasks: project.tasks.map((task: any) => {
        if (task.id === task_data.id) {
          task.completed = task_data.completed;
        }
        return task;
      }),
    });
    return await tx.store.get(project_id);
  });
}
