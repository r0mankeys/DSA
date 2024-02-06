import { expect, test, describe } from "bun:test";
import { Comparator } from "../comparator";
import type { CompareFunction, CompareFunctionResult } from "../comparator";

interface Song {
  name: string;
  artist: string | Array<string>;
  duration: number;
}

const songs: Array<Song> = [
  { name: "Abena", artist: "BenjiFlow", duration: 136 },
  { name: "For You", artist: "BenjiFlow", duration: 164 },
  {
    name: "Where I Go",
    artist: ["NXWorries", "Knxwledge", "Anderson .Paak", "H.E.R"],
    duration: 201,
  },
  { name: "Fan", artist: "Tiffany Gouch\u00e9", duration: 54 },
  { name: "Best Time", artist: "Brent Faiyaz", duration: 82 },
  { name: "New Jazz", artist: "kyra", duration: 127 },
];

describe("Comparator without argument", () => {
  const comparator = new Comparator();
  test("isEqual() Should compare two numbers are equal with default comparator", () => {
    expect(comparator.isEqual(1, 1)).toBe(true);
  });
  test("lessThan() Should compare if first number is less than next number with default comparator", () => {
    expect(comparator.lessThan(2, 0)).toBe(false);
  });
  test("greaterThan() Should compare if first number is greater than next with default comparator", () => {
    expect(comparator.greaterThan(1, 2)).toBe(false);
  });
  test("lessThanOrEqual() Should compare if first number is less than or equal to next number with default comparator", () => {
    expect(comparator.lessThanOrEqual(0, 0)).toBe(true);
  });
  test("greaterThanEqual() Should compare if first number is greater than or equal to next number with default comparator", () => {
    expect(comparator.greaterThanOrEqual(45, 10)).toBe(true);
  });
});

describe("Comparator with argument", () => {
  const compareSongName: CompareFunction<Song> = (
    value,
    { name }: Song
  ): CompareFunctionResult => {
    if (value === name) return 0;
    return null;
  };
  const comparator = new Comparator<Song>(compareSongName);
  test("Should compare a song name as a string to the song object without destructring", () => {
    expect(
      comparator.isEqual("Best Time", {
        name: "Best Time",
        artist: "Brent Faiyaz",
        duration: 82,
      })
    ).toBe(true);
  });
  test("Should compare a song name as a string to the song object without destructring", () => {
    expect(
      comparator.compare("Best Time", {
        name: "NaN",
        artist: "Brent Faiyaz",
        duration: 82,
      })
    ).toBeNull();
  });
});
