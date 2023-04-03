import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router-dom";
import App from "./App";
import Projects from "./projects";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

describe("App route", () => {
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue(projects);
  });

  it("renders a list of projects", async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const projectItems = await findByTestId("project-item");
    expect(projectItems.children.length).toBe(2);
  });

  it("opens and closes project list", async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const nav = await findByTestId("nav");

    const closeButton = await findByTestId("close");
    fireEvent.click(closeButton);
    expect(nav).not.toBeInTheDocument();

    const openButton = await findByTestId("open");
    fireEvent.click(openButton);
    const projectItems = await findByTestId("project-item");
    expect(projectItems).toBeInTheDocument();
  });

  it("navigates to projects page", async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
        <Projects />
      </MemoryRouter>,
    );

    const projectLink = await getByRole("link", { name: "Project 1" });
    const a = fireEvent.click(projectLink);
    expect(document.body.textContent).toContain("Tasks");
  });
});
