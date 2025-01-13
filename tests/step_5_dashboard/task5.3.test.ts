import { getTotalCalories } from "../../src/components/Home/summary";
import { TableRow } from "../../src/components/Home/summary";

describe("getTotalCalories", () => {
  it("should return the total calories from the table rows", () => {
    const tableRows: TableRow[] = [
      {
        name: "meal 1",
        calories: 500,
        entryType: "meal",
        date: new Date("2023-01-01"),
      },
      {
        name: "meal 2",
        calories: 800,
        entryType: "meal",
        date: new Date("2022-01-02"),
      },
      {
        name: "activity 1",
        calories: 100,
        entryType: "activity",
        date: new Date("2021-01-03"),
      },
      {
        name: "activity 2",
        calories: 200,
        entryType: "activity",
        date: new Date("2020-01-04"),
      },
    ];

    const expectedTotalCalories = 1000;

    const result = getTotalCalories(tableRows);

    expect(result).toEqual(expectedTotalCalories);
  });

  it("should correctly handle negative calories from activity logs", () => {
    const tableRows: TableRow[] = [
      {
        name: "meal 1",
        calories: 500,
        entryType: "meal",
        date: new Date("2023-01-01"),
      },
      {
        name: "activity 1",
        calories: 100,
        entryType: "activity",
        date: new Date("2021-01-03"),
      },
    ];

    const expectedTotalCalories = 400;

    const result = getTotalCalories(tableRows);

    expect(result).toEqual(expectedTotalCalories);
  });
});