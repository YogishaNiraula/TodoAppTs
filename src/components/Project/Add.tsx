import React, { Fragment, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { Form } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

export default function ProjectAdd() {
  const [open, setOpen] = useState(false);
  const onClear = () => {
    setOpen(false);
  };
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        <span className="sr-only">Add Project Button</span>
        <BsPlus />
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
                    method="post"
                    replace
                    className="flex flex-col justify-center"
                  >
                    <h3 className="text-xl font-medium">Add Project</h3>
                    <label
                      htmlFor="project_name"
                      className="text-base text-gray-500 my-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      aria-label="project-name"
                      name="project_name"
                      id="project_name"
                      placeholder="Project Name"
                      className="bg-white text-black placeholder:text-gray-600 px-4 py-2 border border-gray-600 rounded my-2"
                      required
                    />

                    <div className="flex space-x-4 justify-end my-4">
                      <button
                        onClick={() => setOpen(false)}
                        type="button"
                        className="bg-gray-200 text-black px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        name="_type"
                        value="createProject"
                        aria-label="add-project-btn"
                        onClick={() => setOpen(false)}
                        className="bg-[#db4c3f] text-white px-4 py-2 rounded"
                      >
                        Add
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
