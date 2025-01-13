import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { getMealLogs } from "../../src/shared/db/meals";


global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
test("Add Activity", async () => {
  render(
    <MemoryRouter initialEntries={["/meals"]}>
      <App />
    </MemoryRouter>
  );

  const mealNameInput = screen.getByTestId("meal-name");
  expect(mealNameInput).toBeInTheDocument();
  expect(mealNameInput).toHaveValue("");

  const caloriesInput = screen.getByTestId("calories");
  expect(caloriesInput).toBeInTheDocument();
  expect(caloriesInput).toHaveValue(null);

  
  const saveButton = screen.getByTestId("save-meal");
  expect(saveButton).toBeInTheDocument();
  expect(saveButton).toBeDisabled();

  act(() => {
    fireEvent.change(mealNameInput, { target: { value: "Salad" } });
    fireEvent.change(caloriesInput, { target: { value: 120 } });
  });
  expect(saveButton).toBeEnabled();

  act(() => {
    fireEvent.click(saveButton);
  });
  await new Promise((r) => setTimeout(r, 2000));

  const mealLogs = await getMealLogs();
  expect(mealLogs.length).toBe(1);
  expect(mealLogs[0].meal).toBe("Salad");
  expect(mealLogs[0].calories).toBe(120);
  expect(mealLogs[0].date).toBeDefined();

  const homeLink = screen.getByTestId("home-link");
  expect(homeLink).toBeInTheDocument();
  fireEvent.click(homeLink);

  const mealsLink = screen.getByTestId("meals-link");
  expect(mealsLink).toBeInTheDocument();
  fireEvent.click(mealsLink);
  await new Promise((r) => setTimeout(r, 2000));

  const mealLogsTable = screen.getByTestId("meal-logs-table");
  expect(mealLogsTable).toBeInTheDocument();
  expect(mealLogsTable).toHaveTextContent("Meal");
  expect(mealLogsTable).toHaveTextContent("Calories");
  expect(mealLogsTable).toHaveTextContent("Date");
});
