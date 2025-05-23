import * as fs from "fs";
import { ValidationResult } from "./types";

export class Reporter {
  public generateReport(result: ValidationResult): string {
    let report = "=== DATA VALIDATION REPORT ===\n\n";

    report += `Total lines processed: ${result.summary.totalLines}\n`;
    report += `Valid lines: ${result.summary.validCount}\n`;
    report += `Lines with errors: ${result.summary.errorCount}\n\n`;

    if (result.errors.length > 0) {
      report += "=== ERRORS FOUND ===\n";
      result.errors.forEach((error) => {
        report += `Line ${error.line}: ${error.message}`;
        if (error.value !== undefined) {
          report += ` (Value: "${error.value}")`;
        }
        report += "\n";
      });
      report += "\n";
    }

    if (result.validLines.length > 0) {
      report += "=== VALID DATA SUMMARY ===\n";
      report += `Successfully validated ${result.validLines.length} records\n`;
    }

    return report;
  }

  public saveReport(result: ValidationResult, filePath: string): void {
    const report = this.generateReport(result);
    fs.writeFileSync(filePath, report, "utf8");
    console.log(`Report saved to: ${filePath}`);
  }

  public printReport(result: ValidationResult): void {
    const report = this.generateReport(result);
    console.log(report);
  }
}
