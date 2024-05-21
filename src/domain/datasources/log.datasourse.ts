import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasourse {
  abstract saveLog(log: LogEntity): Promise<boolean>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
