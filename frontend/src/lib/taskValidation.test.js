import { describe, expect, it } from "vitest";
import {
  EMPTY_TASK_ERROR,
  PAST_TASK_ERROR,
  getTodayDateString,
  getTomorrowDateString,
  toDateString,
  toTimeString,
  validateTaskInput,
} from "./taskValidation";

const now = new Date("2026-06-05T12:30:00");

describe("date formatting", () => {
  it("formats dates for date inputs", () => {
    expect(toDateString(now)).toBe("2026-06-05");
    expect(getTodayDateString(now)).toBe("2026-06-05");
    expect(getTomorrowDateString(now)).toBe("2026-06-06");
  });

  it("formats times for time inputs", () => {
    expect(toTimeString(now)).toBe("12:30");
  });
});

describe("validateTaskInput", () => {
  it("trims valid task input", () => {
    const result = validateTaskInput(
      {
        name: "  math homework  ",
        dueDate: " 2026-06-06 ",
        dueTime: " 09:00 ",
      },
      now,
    );

    expect(result).toEqual({
      isValid: true,
      errorMessage: "",
      task: {
        name: "math homework",
        dueDate: "2026-06-06",
        dueTime: "09:00",
      },
    });
  });

  it("rejects empty fields", () => {
    const result = validateTaskInput(
      {
        name: " ",
        dueDate: "2026-06-06",
        dueTime: "09:00",
      },
      now,
    );

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe(EMPTY_TASK_ERROR);
  });

  it("rejects a past date", () => {
    const result = validateTaskInput(
      {
        name: "math homework",
        dueDate: "2026-06-04",
        dueTime: "23:59",
      },
      now,
    );

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe(PAST_TASK_ERROR);
  });

  it("rejects a past time on today's date", () => {
    const result = validateTaskInput(
      {
        name: "math homework",
        dueDate: "2026-06-05",
        dueTime: "12:29",
      },
      now,
    );

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe(PAST_TASK_ERROR);
  });

  it("allows the current minute on today's date", () => {
    const result = validateTaskInput(
      {
        name: "math homework",
        dueDate: "2026-06-05",
        dueTime: "12:30",
      },
      now,
    );

    expect(result.isValid).toBe(true);
  });
});
