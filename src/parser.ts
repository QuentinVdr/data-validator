import csv from "csv-parser";
import * as fs from "fs";
import { DataRecord } from "./types";

export function parseFile(filePath: string): DataRecord[] {
  const results: DataRecord[] = [];

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // For CSV files
  if (filePath.endsWith(".csv")) {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n").filter((line) => line.trim());

    if (lines.length === 0) return results;

    const headers = lines[0].split(",").map((h) => h.trim());

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const record: DataRecord = {};

      headers.forEach((header, index) => {
        record[header] = values[index] || "";
      });

      results.push(record);
    }

    return results;
  }

  // For JSON files
  if (filePath.endsWith(".json")) {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  }

  throw new Error(`Unsupported file format: ${filePath}`);
}

export function parseCSV(filePath: string): Promise<DataRecord[]> {
  return new Promise((resolve, reject) => {
    const results: DataRecord[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: DataRecord) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}
