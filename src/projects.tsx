import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import TaskList from "./components/Task/List";
import TaskAdd from "./components/Task/Add";
import { completeTask, createTask, deleteTask, editTask } from "./utils/task";
import { getProject } from "./utils/project";
import { z } from "zod";

// Schema for formData types
const projectIdSchema = z.string();
const taskIdSchema = z.number();
const taskTitleSchema = z.string();
const taskDescriptionSchema = z.string();
const taskCompletedSchema = z.string();

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("_type");
  switch (actionType) {
    case "createTask":
      const [id, title, description, completed] = [
        taskIdSchema.parse(Number(formData.get("id"))),
        taskTitleSchema.parse(formData.get("title")),
        taskDescriptionSchema.parse(formData.get("description")),
        taskCompletedSchema.parse(formData.get("completed")),
      ];
      const res = await createTask({
        project_id: projectIdSchema.parse(params.projectId),
        task: { id, title, description, completed },
      });
      return {};
    case "deleteTask":
      await deleteTask({
        project_id: projectIdSchema.parse(params.projectId),
        task_id: taskIdSchema.parse(Number(formData.get("task_id"))),
      });
      return {};
    case "editTask":
      const [edit_id, edit_title, edit_description] = [
        taskIdSchema.parse(Number(formData.get("edit_id"))),
        taskTitleSchema.parse(formData.get("edit_title")),
        taskDescriptionSchema.parse(formData.get("edit_description")),
      ];
      await editTask({
        project_id: projectIdSchema.parse(params.projectId),
        task_data: {
          edit_id,
          edit_title,
          edit_description,
        },
      });
      return {};
    case "completeTask":
      const [task_id, task_complete] = [
        taskIdSchema.parse(Number(formData.get("task_id"))),
        taskCompletedSchema.parse(formData.get("task_complete")),
      ];
      await completeTask({
        project_id: projectIdSchema.parse(params.projectId),
        task_data: {
          id: task_id,
          completed: task_complete,
        },
      });
      return {};
    default:
      throw new Error(`Unknown Action Type ${actionType}`);
  }
}

export async function loader({ params }: any) {
  const project = await getProject(params.projectId);
  return { project };
}

export default function Projects() {
  const project: any = useLoaderData();
  return (
    <div className="mb-20">
      <h5 className="text-xl font-medium">Tasks</h5>
      <TaskList list={project?.project?.tasks} />
      <TaskAdd />
    </div>
  );
}
