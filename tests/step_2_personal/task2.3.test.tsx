import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { getPersonalInfo } from "../../src/shared/db/personalInfo";

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

test("Cancel button handler", async () => {
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

  const gender = screen.getByTestId("gender");
  expect(gender).toBeInTheDocument();
  expect(gender).toHaveDisplayValue("Female")

  const activity = screen.getByTestId("activity");
  expect(activity).toBeInTheDocument();
  expect(activity).toHaveDisplayValue("Light Exercise")

  const saveButton = screen.getByTestId("save");
  expect(saveButton).toBeInTheDocument();

  expect(saveButton).toBeDisabled();

  const heightValue = 171;
  fireEvent.change(heightInput, { target: { value: heightValue } });
  expect(saveButton).toBeDisabled();

  const weightValue = 60;
  fireEvent.change(weightInput, { target: { value: weightValue } });
  expect(saveButton).toBeDisabled();

  const ageValue = 41;
  fireEvent.change(ageInput, { target: { value: ageValue } });
  expect(saveButton).toBeEnabled();

  const genderValue = 'male';
  fireEvent.change(gender, { target: { value: genderValue } });
  expect(gender).toHaveDisplayValue("Male")
  

  fireEvent.click(saveButton);

  const personal = await getPersonalInfo();
  expect(personal).not.toBeNull();
  expect(personal?.heightCm).toBe(heightValue);
  expect(personal?.weightKg).toBe(weightValue);
  expect(personal?.age).toBe(ageValue);
  expect(personal?.gender).toBe(genderValue);
  expect(personal?.activityLevel).toBe("lightExercise");
  expect(personal?.dailyCalorieRequirement).toBe(2020);

  expect(heightInput).toHaveValue(heightValue);
  expect(weightInput).toHaveValue(weightValue);
  expect(ageInput).toHaveValue(ageValue);

  const dailyCalorieRequirementBanner = screen.getByTestId("dailyCalorieRequirementBanner");
  expect(dailyCalorieRequirementBanner).toBeInTheDocument();
  expect(dailyCalorieRequirementBanner).toHaveTextContent(`Your daily calorie requirement is ${personal?.dailyCalorieRequirement}`);

  const cancelButton = screen.getByTestId("cancel");
  expect(cancelButton).toBeInTheDocument();

  expect(cancelButton).toBeEnabled();

  fireEvent.click(cancelButton);

  expect(heightInput).toHaveValue(0);
  expect(weightInput).toHaveValue(0);
  expect(ageInput).toHaveValue(0);
  expect(gender).toHaveDisplayValue("Female")
  expect(activity).toHaveDisplayValue("Light Exercise")
  expect(dailyCalorieRequirementBanner).not.toBeInTheDocument();
});
