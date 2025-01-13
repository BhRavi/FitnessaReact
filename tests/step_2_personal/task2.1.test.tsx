import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";

test("Enable save button", () => {
  render(
    <MemoryRouter initialEntries={["/personal"]}>
      <App />
    </MemoryRouter>
  );

  const heightInput = screen.getByTestId("height");
  expect(heightInput).toBeInTheDocument();
  expect(heightInput).toHaveValue(0);

  const weightInput = screen.getByTestId("weight");
  expect(weightInput).toBeInTheDocument();
  expect(weightInput).toHaveValue(0);

  const ageInput = screen.getByTestId("age");
  expect(ageInput).toBeInTheDocument();
  expect(ageInput).toHaveValue(0);

  const saveButton = screen.getByTestId("save");
  expect(saveButton).toBeInTheDocument();

  expect(saveButton).toBeDisabled();

  fireEvent.change(heightInput, { target: { value: 1 } });
  expect(saveButton).toBeDisabled();

  fireEvent.change(weightInput, { target: { value: 1 } });
  expect(saveButton).toBeDisabled();

  fireEvent.change(ageInput, { target: { value: 1 } });
  expect(saveButton).toBeEnabled();
});
