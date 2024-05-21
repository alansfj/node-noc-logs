interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type Url = string;
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  private readonly url;
  private readonly successCallback;
  private readonly errorCallback;

  constructor(
    url: Url,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback
  ) {
    this.url = url;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  public async execute() {
    try {
      const req = await fetch(this.url);

      if (!req.ok) {
        throw new Error(`${this.url} is NOT ok`);
      }

      this.successCallback();

      return true;
    } catch (error) {
      this.errorCallback(`${error}`);

      return false;
    }
  }
}
