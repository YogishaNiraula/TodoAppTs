import React, { Fragment, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Form } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

type EditProps = {
  taskData: {
    id: number;
    title: string;
    description: string;
    completed: string;
  };
};

export default function TaskEdit({ taskData }: EditProps) {
  const [open, setOpen] = useState(false);
  const onClear = () => {
    setOpen(false);
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <FiEdit3 />
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
                  <Form
                    onSubmit={onClear}
                    replace
                    method="post"
                    className="flex flex-col justify-center"
                  >
                    <input
                      type="text"
                      name="edit_title"
                      defaultValue={taskData.title}
                      placeholder="Task Name"
                      required
                      className="outline-none focus:outline-none bg-white text-black placeholder:text-gray-600 placeholder:font-medium text-lg font-medium my-3"
                    />
                    <textarea
                      name="edit_description"
                      defaultValue={taskData.description}
                      placeholder="Description"
                      className="outline-none focus:outline-none bg-white text-black"
                    />
                    <input
                      type="text"
                      hidden
                      value={taskData.id}
                      name="edit_id"
                      readOnly
                    />

                    <div className="flex space-x-4 justify-end my-4">
                      <button
                        onClick={() => setOpen(false)}
                        className="bg-gray-200 text-black px-4 py-2 rounded"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        name="_type"
                        value="editTask"
                        className="bg-TodoRed text-white px-4 py-2 rounded"
                      >
                        Edit Task
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
