import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type DeleteProps = {
  project: {
    id: string;
    name: string;
    tasks: [
      {
        id: number;
        completed: string;
        title: string;
        description: string;
      },
    ];
  };
};

export default function ProjectDelete({ project }: DeleteProps) {
  const [open, setOpen] = useState(false);
  const onClear = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        data-testid="delete"
        className={`hover:bg-TodoRed hover:text-white text-gray-900 group flex w-full items-center rounded p-2 text-sm`}
      >
        <MdDeleteOutline className="mr-2 h-4 w-4" /> Delete
      </button>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Form method="post" onSubmit={onClear}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Delete Project?
                    </Dialog.Title>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">
                        Are you sure you want to delete{" "}
                        <span className="text-black font-medium">
                          {project?.name}
                        </span>
                        ?
                      </span>
                    </div>
                    <input
                      type="text"
                      hidden
                      value={project?.id}
                      name="delete_id"
                      readOnly
                    />
                    <div className="flex space-x-4 justify-end my-4">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="bg-gray-200 text-black px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        name="_type"
                        value="deleteProject"
                        className="bg-TodoRed text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
