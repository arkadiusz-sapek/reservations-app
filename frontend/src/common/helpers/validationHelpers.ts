import * as Yup from 'yup';

export const getRequired = (message: string) =>
    Yup.string().trim().required(`${message} is required`);
