import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";


test("Meals route exists", () => {
  render(
    <MemoryRouter initialEntries={["/meals"]}>
      <App />
    </MemoryRouter>
  );

  const routeElement = screen.getByTestId("meals");
  expect(routeElement).toBeInTheDocument();
});

test("Activity route exists", () => {
  render(
    <MemoryRouter initialEntries={["/activity"]}>
      <App />
    </MemoryRouter>
  );

  const routeElement = screen.getByTestId("activity");
  expect(routeElement).toBeInTheDocument();
});

test("My Information route exists", () => {
  render(
    <MemoryRouter initialEntries={["/personal"]}>
      <App />
    </MemoryRouter>
  );

  const routeElement = screen.getByTestId("personal");
  expect(routeElement).toBeInTheDocument();
});
