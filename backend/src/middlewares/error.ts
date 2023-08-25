export interface CustomResponse  {
    status?: number;
    data?: any;
    message: string;
  }
  

export const createError = (status : number, message: string, data?: any) => {
    const error : CustomResponse = new Error(message);
    error.status = status;
    error.data = data;
    return error;
}