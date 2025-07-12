class AppError extends Error {
  public isOperational: boolean;
  constructor(msg: string, public code: number) {
    super(msg);
    this.isOperational = true;
  }
}

export default AppError;
