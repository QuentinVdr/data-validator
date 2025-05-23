import { DataRecord, ValidationError, ValidationResult } from "./types";

export class Validator {
  private requiredFields: string[] = ["name", "email", "age"];

  constructor(requiredFields?: string[]) {
    if (requiredFields) {
      this.requiredFields = requiredFields;
    }
  }

  public validateData(data: DataRecord[]): ValidationResult {
    const validLines: DataRecord[] = [];
    const errors: ValidationError[] = [];

    data.forEach((record, index) => {
      const lineNumber = index + 1;
      let isValid = true;

      // Check for missing required fields
      for (const field of this.requiredFields) {
        if (!record[field] || record[field].toString().trim() === "") {
          errors.push({
            line: lineNumber,
            field,
            message: `Missing required field: ${field}`,
            value: record[field],
          });
          isValid = false;
        }
      }

      // Check email format
      if (record.email && !this.isValidEmail(record.email)) {
        errors.push({
          line: lineNumber,
          field: "email",
          message: "Invalid email format",
          value: record.email,
        });
        isValid = false;
      }

      // Check age format and logical consistency
      if (record.age) {
        const age = parseInt(record.age);
        if (isNaN(age)) {
          errors.push({
            line: lineNumber,
            field: "age",
            message: "Age must be a number format",
            value: record.age,
          });
          isValid = false;
        } else if (age < 0 || age > 150) {
          errors.push({
            line: lineNumber,
            field: "age",
            message: "Age must be logical (0-150)",
            value: age,
          });
          isValid = false;
        }
      }

      if (isValid) {
        validLines.push(record);
      }
    });

    return {
      validLines,
      errors,
      summary: {
        totalLines: data.length,
        validCount: validLines.length,
        errorCount: errors.length,
      },
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
