import { activityLogsToTableRows } from "../../src/components/Home/summary";
import { ActivityLog } from "../../src/shared/types";

describe("activityLogsToTableRows", () => {
  it("should convert activity logs to table rows", () => {
    const activityLogs: ActivityLog[] = [
      {
        activity: "running",
        calories: 100,
        date: new Date(),
      },
      {
        activity: "swimming",
        calories: 200,
        date: new Date(),
      },
    ];

    const expectedTableRows = [
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

    const result = activityLogsToTableRows(activityLogs);

    expect(result).toEqual(expectedTableRows);
  });
});