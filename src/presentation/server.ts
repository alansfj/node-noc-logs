import { CheckService } from "../domain/use-cases/check.service";
import { CronService } from "./cron/cron.service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createAndStartJob("*/5 * * * * *", () => {
      const url = "https://google.com";

      new CheckService(
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
