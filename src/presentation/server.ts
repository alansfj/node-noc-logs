import { CheckService } from "../domain/use-cases/check.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogImplRepository } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron.service";

export class Server {
  public static start() {
    console.log("Server started...");

    const fileSystemDatasource = new FileSystemDatasource();
    const logRepository = new LogImplRepository(fileSystemDatasource);

    CronService.createAndStartJob("*/5 * * * * *", () => {
      const url = "https://google.com";

      new CheckService(
        logRepository,
        url,
        () => {
          console.log(`${url} is ok`);
        },
        (error) => {
          console.log(`${error}`);
        }
      ).execute();
    });
  }
}
