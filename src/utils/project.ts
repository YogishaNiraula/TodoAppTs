import { withProjectDB } from "./indexDB";

type CreateProjectType = {
  id: string;
  project_name: string;
  tasks: [
    {
      id: number;
      title: string;
      description: string;
      completed: string;
    },
  ];
};

export async function createProject({
  id,
  project_name,
  tasks,
}: CreateProjectType) {
  return await withProjectDB(async (tx: any) => {
    await tx.store.add({
      id: id,
      name: project_name,
      tasks: tasks,
    });
    return id;
  });
}

export async function getProjects() {
  return await withProjectDB(async (tx: any) => {
    return await tx.store.getAll();
  }, "readonly");
}

export async function getProject(id: string) {
  return await withProjectDB(async (tx: any) => {
    return await tx.store.get(id);
  }, "readonly");
}

type EditProjectType = {
  id: string;
  project_data: {
    name: string;
  };
};
export async function editProject({ id, project_data }: EditProjectType) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(id);
    await tx.store.put({
      ...project,
      name: project_data.name,
    });
  });
}

export async function deleteProject(id: string) {
  return await withProjectDB(async (tx) => {
    await tx.store.delete(id);
  });
}
