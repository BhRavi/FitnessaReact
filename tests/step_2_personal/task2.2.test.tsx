import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { getPersonalInfo } from "../../src/shared/db/personalInfo";

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

test("Enable save button", async () => {
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

  fireEvent.change(heightInput, { target: { value: 171 } });
  expect(saveButton).toBeDisabled();

  fireEvent.change(weightInput, { target: { value: 60 } });
  expect(saveButton).toBeDisabled();

  fireEvent.change(ageInput, { target: { value: 41 } });
  expect(saveButton).toBeEnabled();

  fireEvent.click(saveButton);

  const personal = await getPersonalInfo();
  expect(personal).not.toBeNull();
  expect(personal?.heightCm).toBe(171);
  expect(personal?.weightKg).toBe(60);
  expect(personal?.age).toBe(41);
  expect(personal?.gender).toBe("female");
  expect(personal?.activityLevel).toBe("lightExercise");
  expect(personal?.dailyCalorieRequirement).toBe(1791);
});
