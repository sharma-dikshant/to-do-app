import { Response } from "express";

class APIResponse {
  constructor(
    private statusCode: number,
    private message: string,
    private data: any
  ) {}

  send(res: Response) {
    res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    });
  }
}

export default APIResponse;
