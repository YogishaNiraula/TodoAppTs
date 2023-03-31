import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ProjectDelete from "./Delete";
import ProjectEdit from "./Edit";

type MenuProps = {
  project: {
    id: string;
    name: string;
    tasks: [];
  };
};

export default function ProjectMenu({ project }: MenuProps) {
  return (
    <div className="w-56 text-right">
      <Menu
        as="div"
        id={project.id}
        className="relative inline-block text-left"
      >
        <Menu.Button className="z-5 inline-flex w-full justify-center rounded-md">
          <BiDotsHorizontalRounded
            className="ml-2 -mr-1 h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="z-20 absolute -right-12 mt-2 w-56"
        >
          <Menu.Items className="origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Fragment>
                    <ProjectEdit projectData={project} />
                  </Fragment>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Fragment>
                    <ProjectDelete project={project} />
                  </Fragment>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
