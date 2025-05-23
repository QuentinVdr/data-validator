export interface DataRecord {
    [key: string]: any;
}

export interface ValidationError {
    line: number;
    field: string;
    message: string;
    value?: any;
}

export interface ValidationResult {
    validLines: DataRecord[];
    errors: ValidationError[];
    summary: {
        totalLines: number;
        validCount: number;
        errorCount: number;
    };
}