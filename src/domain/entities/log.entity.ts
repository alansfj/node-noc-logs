export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

type CreatedAt = string | Date;

export interface LogJson {
  level: LogSeverityLevel;
  message: string;
  createdAt: CreatedAt;
}

export interface LogEntityInterface {
  message: string;
  severity: LogSeverityLevel;
  createdAt: CreatedAt;
}

export class LogEntity implements LogEntityInterface {
  public message: string;
  public severity: LogSeverityLevel;
  public createdAt: CreatedAt;

  constructor(
    message: string,
    severity: LogSeverityLevel,
    createdAt?: CreatedAt
  ) {
    this.message = message;
    this.severity = severity;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  static stringToEntity(logString: string) {
    const logJson: LogJson = JSON.parse(logString);

    return new LogEntity(logJson.message, logJson.level, logJson.createdAt);
  }
}
