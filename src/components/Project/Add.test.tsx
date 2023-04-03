import React from "react";
import { render } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import ProjectAdd from "./Add";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

describe("Add Project Component", () => {
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue(projects);
  });
  it("renders Add component", async () => {
    const { getByTestId } = render(<ProjectAdd />);

    const button = getByTestId("dialog-button");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
