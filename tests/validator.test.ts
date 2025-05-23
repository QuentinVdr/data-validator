import { parseFile } from "../src/parser";
import { DataRecord } from "../src/types";
import { Validator } from "../src/validator";

// Export for test runner
export async function runTests(): Promise<void> {
  const tests = [
    testValidData,
    testMissingFields,
    testIncorrectFormats,
    testLogicalInconsistencies,
  ];

  for (const test of tests) {
    await test();
  }
}

function testValidData(): void {
  const validator = new Validator();
  const validData: DataRecord[] = parseFile("tests/fixtures/valid-data.csv");
  const { validLines, errors } = validator.validateData(validData);

  if (validLines.length !== validData.length || errors.length !== 0) {
    throw new Error("Valid data test failed");
  }
}

function testMissingFields(): void {
  const validator = new Validator();
  const invalidData: DataRecord[] = parseFile(
    "tests/fixtures/invalid-data.csv"
  );
  const { validLines, errors } = validator.validateData(invalidData);

  const hasMissingError = errors.some((error) =>
    error.message.toLowerCase().includes("missing")
  );

  if (!hasMissingError) {
    throw new Error("Missing fields test failed");
  }
}

function testIncorrectFormats(): void {
  const validator = new Validator();
  const invalidData: DataRecord[] = parseFile(
    "tests/fixtures/invalid-data.csv"
  );
  const { validLines, errors } = validator.validateData(invalidData);

  const hasFormatError = errors.some((error) =>
    error.message.toLowerCase().includes("format")
  );

  if (!hasFormatError) {
    throw new Error("Incorrect formats test failed");
  }
}

function testLogicalInconsistencies(): void {
  const validator = new Validator();
  const invalidData: DataRecord[] = parseFile(
    "tests/fixtures/invalid-data.csv"
  );
  const { validLines, errors } = validator.validateData(invalidData);

  const hasLogicalError = errors.some((error) =>
    error.message.toLowerCase().includes("logical")
  );

  if (!hasLogicalError) {
    throw new Error("Logical inconsistencies test failed");
  }
}

// Jest tests
describe("Validator", () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator();
  });

  test("should validate correct data", () => {
    const validData: DataRecord[] = parseFile("tests/fixtures/valid-data.csv");
    const { validLines, errors } = validator.validateData(validData);

    expect(validLines.length).toBe(validData.length);
    expect(errors.length).toBe(0);
  });

  test("should identify missing fields", () => {
    const invalidData: DataRecord[] = parseFile(
      "tests/fixtures/invalid-data.csv"
    );
    const { validLines, errors } = validator.validateData(invalidData);

    expect(validLines.length).toBeLessThan(invalidData.length);
    expect(errors).toContainEqual(
      expect.objectContaining({
        message: expect.stringContaining("missing"),
      })
    );
  });

  test("should identify incorrect formats", () => {
    const invalidData: DataRecord[] = parseFile(
      "tests/fixtures/invalid-data.csv"
    );
    const { validLines, errors } = validator.validateData(invalidData);

    expect(errors).toContainEqual(
      expect.objectContaining({
        message: expect.stringContaining("format"),
      })
    );
  });

  test("should identify logical inconsistencies", () => {
    const invalidData: DataRecord[] = parseFile(
      "tests/fixtures/invalid-data.csv"
    );
    const { validLines, errors } = validator.validateData(invalidData);

    expect(errors).toContainEqual(
      expect.objectContaining({
        message: expect.stringContaining("logical"),
      })
    );
  });
});
