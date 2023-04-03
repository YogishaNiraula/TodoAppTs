import React from "react";
import { render } from "@testing-library/react";
import Projects from "./projects";
import { MemoryRouter, useLoaderData } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

describe("Projects Route", () => {
  const project = {
    id: 123,
    tasks: [
      {
        id: 234,
        completed: "false",
        title: "Task 1",
        description: "Task description",
      },
    ],
  };

  beforeAll(async () => {
    (useLoaderData as jest.Mock).mockReturnValue(project);
  });

  it("should render projects route", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/projects/123"]}>
        <Projects />
      </MemoryRouter>,
    );

    const heading = getByRole("heading", { level: 5 });
    expect(heading.innerHTML).toBe("Tasks");
  });
});
