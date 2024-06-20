import { expect, test } from "vitest";
import { getAverageRating } from "./utils";

test("getAverageRating() should return the average rating", () => {
  const items = [
    { rating: 1 },
    { rating: 2 },
    { rating: 3 },
    { rating: 4 },
    { rating: 5 },
  ];

  const result = getAverageRating(items);

  expect(result).toBe(3);
});

test("getAverageRating() should return null if no items", () => {
  const items: { rating: number }[] = [];

  const result = getAverageRating(items);

  expect(result).toBe(null);
});
