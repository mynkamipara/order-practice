
class Apiresponse<T> {
  public success: boolean;
  public message: string;
  public data: T;

  constructor(status: number, data: T, message = 'Success') {
    this.success = status < 400;
    this.message = message;


    this.data = data;
  }
}

export { Apiresponse };
