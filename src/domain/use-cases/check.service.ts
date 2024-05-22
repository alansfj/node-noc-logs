import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "../repositories/log.repository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type Url = string;
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  private readonly logRepository: LogRepository;
  private readonly url;
  private readonly successCallback;
  private readonly errorCallback;

  constructor(
    logRepository: LogRepository,
    url: Url,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback
  ) {
    this.logRepository = logRepository;
    this.url = url;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  public async execute() {
    try {
      const req = await fetch(this.url);

      if (!req.ok) {
        throw new Error(`Service ${this.url} is NOT ok`);
      }

      const log = new LogEntity(
        `Service ${this.url} is ok`,
        LogSeverityLevel.low
      );

      this.logRepository.saveLog(log);

      this.successCallback();

      return true;
    } catch (error) {
      const errorMesage = `${error}`;

      const log = new LogEntity(errorMesage, LogSeverityLevel.high);
      this.logRepository.saveLog(log);

      this.errorCallback(errorMesage);

      return false;
    }
  }
}
