import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  public static createAndStartJob(cronTime: CronTime, onTick: OnTick): CronJob {
    return new CronJob(cronTime, onTick, null, true);
  }
}
