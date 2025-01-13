import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { savePersonalInfo } from "../../src/shared/db/personalInfo";
import { getActivityLogs } from "../../src/shared/db/activity";
import { act } from '@testing-library/react';


global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
test("Add Activity", async () => {
  render(
    <MemoryRouter initialEntries={["/activity"]}>
      <App />
    </MemoryRouter>
  );

  {
    // save personal info
    await savePersonalInfo({
      activityLevel: "lightExercise",
      age: 41,
      heightCm: 171,
      weightKg: 60,
      gender: "male",
      dailyCalorieRequirement: 1791,
    })
  }

  const activityTimeInput = screen.getByTestId("activity-time-min");
  expect(activityTimeInput).toBeInTheDocument();
  expect(activityTimeInput).toHaveValue(null);

  
  const saveButton = screen.getByTestId("save-activity");
  expect(saveButton).toBeInTheDocument();
  expect(saveButton).toBeDisabled();

  act(() => {
    fireEvent.change(activityTimeInput, { target: { value: 60 } });
  });
  expect(saveButton).toBeEnabled();

  act(() => {
    fireEvent.click(saveButton);
  });
  await new Promise((r) => setTimeout(r, 2000));

  const activityLogs = await getActivityLogs();
  expect(activityLogs.length).toBe(1);
  expect(activityLogs[0].activity).toBe("running");
  expect(activityLogs[0].calories).toBeGreaterThan(200);
  expect(activityLogs[0].date).toBeDefined();

  const activityTable = screen.getByTestId("activity-log-table");
  expect(activityTable).toBeInTheDocument();
  expect(activityTable).toHaveTextContent("Activity");
  expect(activityTable).toHaveTextContent("Calories");
  expect(activityTable).toHaveTextContent("Date");
});
