import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import ProjectMenu from "./Menu";

describe("Menu Component", () => {
  const project = {
    id: "abc123",
    name: "Project1",
    tasks: [
      {
        id: 123,
        completed: "false",
        title: "Task 1",
        description: "This is a description",
      },
    ],
  };

  it("renders menu", async () => {
    const { getByRole } = render(<ProjectMenu project={project} />);
    const menuButton = getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("opens menu on button click", async () => {
    const { getByRole, getByTestId } = render(
      <ProjectMenu project={project} />,
    );
    const menuButton = getByRole("button");

    await act(async () => {
      fireEvent.click(menuButton);
    });

    const deleteButton = getByTestId("delete");
    const editButton = getByTestId("edit");

    // buttons to be rendered after click
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    // buttons should not be disabled
    expect(deleteButton).not.toBeDisabled();
    expect(editButton).not.toBeDisabled();
  });
});
