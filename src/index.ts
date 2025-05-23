import { parseFile } from "./parser";
import { Reporter } from "./reporter";
import { Validator } from "./validator";

async function main() {
  try {
    console.log("Starting data validation...");

    // Parse the sample data
    const validData = parseFile("data/sample-valid.csv");
    const invalidData = parseFile("data/sample-invalid.csv");

    // Create validator and reporter
    const validator = new Validator();
    const reporter = new Reporter();

    // Validate valid data
    console.log("\n=== Validating sample-valid.csv ===");
    const validResult = validator.validateData(validData);
    reporter.printReport(validResult);

    // Validate invalid data
    console.log("\n=== Validating sample-invalid.csv ===");
    const invalidResult = validator.validateData(invalidData);
    reporter.printReport(invalidResult);

    // Save reports
    reporter.saveReport(validResult, "valid-data-report.txt");
    reporter.saveReport(invalidResult, "invalid-data-report.txt");
  } catch (error) {
    console.error("Error during validation:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { parseFile } from "./parser";
export { Reporter } from "./reporter";
export * from "./types";
export { Validator } from "./validator";
