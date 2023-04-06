import { useState } from "react";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
  redirect,
  ActionFunctionArgs,
} from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProjectMenu from "./components/Project/Menu";
import ProjectAdd from "./components/Project/Add";
import { insertDataInDB } from "./utils/indexDB";
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from "./utils/project";
import { z } from "zod";

// schema for formData types
const StringSchema = z.string();
const ProjectIdSchema = z.string();
const TaskIdSchema = z.number();

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("_type");
  switch (actionType) {
    case "createProject":
      let id = Math.random().toString(36).substring(2, 9);
      let project_name = StringSchema.parse(formData.get("project_name"));
      const [task_id, task_name, task_completed, task_description] = [
        TaskIdSchema.parse(Number(formData.get("task_id"))),
        StringSchema.parse(formData.get("task_name")),
        StringSchema.parse(formData.get("task_completed")),
        StringSchema.parse(formData.get("task_description")),
      ];
      const projectId = await createProject({
        id: id,
        project_name,
        tasks: [
          {
            id: task_id,
            title: task_name,
            description: task_description,
            completed: task_completed,
          },
        ],
      });
      return redirect(`/projects/${projectId}`);
    case "deleteProject":
      await deleteProject(ProjectIdSchema.parse(formData.get("delete_id")));
      return redirect("/");
    case "editProject":
      const [edit_id, edit_name] = [
        ProjectIdSchema.parse(formData.get("edit_id")),
        StringSchema.parse(formData.get("edit_name")),
      ];
      await editProject({ id: edit_id, project_data: { name: edit_name } });
      return redirect(`/projects/${edit_id}`);
    default:
      throw new Error(`Unknown Action Type ${actionType}`);
  }
}

export async function loader() {
  await insertDataInDB();
  const projects = await getProjects();
  return projects;
}

export default function App() {
  const projects: any = useLoaderData();
  let { projectId } = useParams();
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="lg:flex justify-start space-x-5">
      <aside className="min-h-full p-10 w-96">
        <div className="flex items-center justify-between">
          <h5>Projects</h5>
          <div className="flex items-center space-x-3">
            <ProjectAdd />
            {showNav ? (
              <button onClick={() => setShowNav(false)}>
                <MdKeyboardArrowUp />
              </button>
            ) : (
              <button onClick={() => setShowNav(true)}>
                <MdKeyboardArrowDown />
              </button>
            )}
          </div>
        </div>
        {showNav && (
          <nav className="-ml-3">
            {projects?.length ? (
              <ul>
                {projects?.map((project: any) => (
                  <li key={project.id}>
                    <NavLink
                      to={`projects/${project.id}`}
                      className={`${
                        project?.id === projectId
                          ? "bg-slate-200"
                          : "bg-transparent"
                      } group flex justify-between items-start my-1 hover:bg-slate-200 px-3 rounded py-1`}
                    >
                      <p className="text-black text-sm font-normal truncate">
                        {project?.name}
                      </p>
                      <div>
                        <ProjectMenu project={project} />
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects</p>
            )}
          </nav>
        )}
      </aside>
      <div className="lg:w-1/2">
        <div className="container mx-auto p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
