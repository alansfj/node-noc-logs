export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public message: string;
  public severity: LogSeverityLevel;
  public createdAt: Date;

  constructor(message: string, severity: LogSeverityLevel) {
    this.message = message;
    this.severity = severity;
    this.createdAt = new Date();
  }
}
