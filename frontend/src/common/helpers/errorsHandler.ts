import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { ApiError } from 'common/typings/errorTypings';

export const handleErrors = (apiError: AxiosError<ApiError>) => {
    toast.warning(apiError.response?.data.message);

    return apiError;
};
