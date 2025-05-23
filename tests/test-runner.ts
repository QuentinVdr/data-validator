import { parseFile } from "../src/parser";
import { DataRecord } from "../src/types";
import { Validator } from "../src/validator";

export async function runTests(): Promise<void> {
  console.log("Running validation tests...\n");

  let passed = 0;
  let failed = 0;

  try {
    // Test 1: Valid data
    console.log("Test 1: Validating correct data...");
    const validData: DataRecord[] = parseFile("tests/fixtures/valid-data.csv");
    const validator = new Validator();
    const validResult = validator.validateData(validData);

    if (
      validResult.validLines.length === validData.length &&
      validResult.errors.length === 0
    ) {
      console.log("✓ PASSED: Valid data test");
      passed++;
    } else {
      console.log("✗ FAILED: Valid data test");
      failed++;
    }

    // Test 2: Invalid data
    console.log("Test 2: Identifying errors in invalid data...");
    const invalidData: DataRecord[] = parseFile(
      "tests/fixtures/invalid-data.csv"
    );
    const invalidResult = validator.validateData(invalidData);

    if (invalidResult.errors.length > 0) {
      console.log("✓ PASSED: Invalid data test");
      passed++;
    } else {
      console.log("✗ FAILED: Invalid data test");
      failed++;
    }

    // Test 3: Check for specific error types
    console.log("Test 3: Checking specific error types...");
    const hasFormatError = invalidResult.errors.some((error) =>
      error.message.toLowerCase().includes("format")
    );
    const hasMissingError = invalidResult.errors.some((error) =>
      error.message.toLowerCase().includes("missing")
    );
    const hasLogicalError = invalidResult.errors.some((error) =>
      error.message.toLowerCase().includes("logical")
    );

    if (hasFormatError && hasMissingError && hasLogicalError) {
      console.log("✓ PASSED: Specific error types test");
      passed++;
    } else {
      console.log("✗ FAILED: Specific error types test");
      console.log(`  Format errors: ${hasFormatError}`);
      console.log(`  Missing errors: ${hasMissingError}`);
      console.log(`  Logical errors: ${hasLogicalError}`);
      failed++;
    }
  } catch (error) {
    console.error("Test execution error:", error);
    failed++;
  }

  console.log(`\n=== Test Results ===`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);

  if (failed > 0) {
    throw new Error(`${failed} test(s) failed`);
  }
}
