import { LogDatasourse } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogImplRepository implements LogRepository {
  private logDatasource: LogDatasourse;

  constructor(logDatasource: LogDatasourse) {
    this.logDatasource = logDatasource;
  }

  async saveLog(log: LogEntity): Promise<boolean> {
    return this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
