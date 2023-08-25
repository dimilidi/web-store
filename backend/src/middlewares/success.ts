export const createSuccess = (status: number, message: string,  data: any) => {
    const successObj = {
        status,
        message, 
        data
    }
    return successObj;
}