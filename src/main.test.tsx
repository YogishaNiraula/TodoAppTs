import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Projects from "./projects";

jest.mock("./App", () => ({
  __esModule: true,
  default: jest.fn(),
  action: jest.fn(),
  loader: jest.fn(),
}));

jest.mock("./projects", () => ({
  __esModule: true,
  default: jest.fn(),
  action: jest.fn(),
  loader: jest.fn(),
}));

describe("main.js", () => {
  it("renders Root component with router", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(App).toHaveBeenCalledTimes(1);
    expect(Projects).not.toHaveBeenCalled();
  });

  it("renders Projects component with router", async () => {
    render(
      <MemoryRouter initialEntries={["/projects/123"]}>
        <Projects />
      </MemoryRouter>,
    );

    expect(Projects).toHaveBeenCalledTimes(1);
  });
});
