import {
  TableRow,
  getTableRows
} from "../../src/components/Home/summary";
import { ActivityLog, MealLog } from "../../src/shared/types";

describe("getTableRows", () => {
  it("should return sorted table rows combining meal logs and activity logs", () => {
    const mealLogs: MealLog[] = [
      {
        meal: "breakfast",
        calories: 500,
        date: new Date("2023-01-01"),
      },
      {
        meal: "lunch",
        calories: 800,
        date: new Date("2022-01-02"),
      },
    ];

    const activityLogs: ActivityLog[] = [
      {
        activity: "running",
        calories: 100,
        date: new Date("2021-01-03"),
      },
      {
        activity: "swimming",
        calories: 200,
        date: new Date("2020-01-04"),
      },
    ];

    const expectedTableRows: TableRow[] = [
      {
        name: mealLogs[0].meal,
        calories: mealLogs[0].calories,
        entryType: "meal",
        date: mealLogs[0].date,
      },
      {
        name: mealLogs[1].meal,
        calories: mealLogs[1].calories,
        entryType: "meal",
        date: mealLogs[1].date,
      },
      {
        name: activityLogs[0].activity,
        calories: activityLogs[0].calories,
        entryType: "activity",
        date: activityLogs[0].date,
      },
      {
        name: activityLogs[1].activity,
        calories: activityLogs[1].calories,
        entryType: "activity",
        date: activityLogs[1].date,
      },
    ];

    const result = getTableRows(mealLogs, activityLogs);

    expect(result).toEqual(expectedTableRows);
    expectedTableRows.forEach((row, index) => {
      const resultRow = result[index];
      expect(resultRow.name).toEqual(row.name);
      expect(resultRow.calories).toEqual(row.calories);
      expect(resultRow.entryType).toEqual(row.entryType);
      // expect(resultRow.date).toEqual(row.date);

    });
  });
});
