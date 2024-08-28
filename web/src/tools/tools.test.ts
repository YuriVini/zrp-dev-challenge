import { getRandomNumber } from "./index"
import { expect } from "vitest"

test("should generate a random number", () => {
  const result = getRandomNumber(1, 2)
  expect(result).toBeTruthy()
})
