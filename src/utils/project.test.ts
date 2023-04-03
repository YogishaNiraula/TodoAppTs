import { insertDataInDB } from "./indexDB";
import {
  createProject,
  deleteProject,
  editProject,
  getProject,
  getProjects,
} from "./project";

describe("Project Functions", () => {
  beforeAll(async () => {
    await insertDataInDB();
  });

  it("creates a project", async () => {
    await createProject({ id: "abc", project_name: "Project Test" });
    const response = await getProjects();
    expect(response[0].name).toBe("Project Test");
  });

  it("edits a project", async () => {
    await editProject({ id: "abc", project_data: { name: "Project Test2" } });
    const response = await getProjects();
    expect(response[0].name).toBe("Project Test2");
  });

  it("gets all projects", async () => {
    await createProject({ id: "def", project_name: "Project Test" });
    const response = await getProjects();
    expect(response.length).toBe(2);
  });

  it("gets project with id", async () => {
    const response = await getProject("def");
    expect(response.id).toBe("def");
    expect(response.tasks.length).toBe(0);
  });

  it("deletes a project", async () => {
    await deleteProject("def");
    const response = await getProjects();
    expect(response.length).toBe(1);
  });
});
