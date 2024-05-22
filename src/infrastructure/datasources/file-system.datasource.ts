import fs from "fs";
import { LogDatasourse } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasourse {
  private logsDirectory: string = "logs/";
  private allLogsFilePath: string = `${this.logsDirectory}/all-logs.log`;
  private lowLogsFilePath: string = `${this.logsDirectory}/log-logs.log`;
  private mediumLogsFilePath: string = `${this.logsDirectory}/medium-logs.log`;
  private highLogsFilePath: string = `${this.logsDirectory}/high-logs.log`;

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles() {
    if (!fs.existsSync(this.logsDirectory)) {
      fs.mkdirSync(this.logsDirectory);
    }

    [
      this.allLogsFilePath,
      this.lowLogsFilePath,
      this.mediumLogsFilePath,
      this.highLogsFilePath,
    ].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
      }
    });
  }

  async saveLog(log: LogEntity): Promise<boolean> {
    try {
      const logObject = {
        level: log.severity,
        message: log.message,
        createdAt: log.createdAt,
      };

      const logJson = JSON.stringify(logObject);

      fs.appendFileSync(`${this.allLogsFilePath}`, `${logJson}\n`);

      if (log.severity === LogSeverityLevel.low) {
        fs.appendFileSync(`${this.lowLogsFilePath}`, `${logJson}\n`);
      }
      if (log.severity === LogSeverityLevel.medium) {
        fs.appendFileSync(`${this.mediumLogsFilePath}`, `${logJson}\n`);
      }
      if (log.severity === LogSeverityLevel.high) {
        fs.appendFileSync(`${this.highLogsFilePath}`, `${logJson}\n`);
      }

      return true;
    } catch (error) {
      console.log(`${error}`);

      return false;
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      let fileContent = "";

      if (severityLevel === LogSeverityLevel.low) {
        fileContent = fs.readFileSync(this.lowLogsFilePath, {
          encoding: "utf-8",
        });
      }

      if (severityLevel === LogSeverityLevel.medium) {
        fileContent = fs.readFileSync(this.mediumLogsFilePath, {
          encoding: "utf-8",
        });
      }

      if (severityLevel === LogSeverityLevel.high) {
        fileContent = fs.readFileSync(this.highLogsFilePath, {
          encoding: "utf-8",
        });
      }

      const logsArray = fileContent.split("\n");

      const logs = logsArray.map(LogEntity.stringToEntity);

      return logs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
