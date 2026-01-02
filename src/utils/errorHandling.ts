import { AxiosError } from "axios";
import { ERRORS } from "@/constants";

export const getApiError = (error: unknown) => {
  try {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message?.error) {
        return (
          `${ERRORS.error}: ` +
          JSON.stringify(error.response.data.message.error)
        );
      }

      if (error.response?.data?.message) {
        return (
          `${ERRORS.error}: ` + JSON.stringify(error.response.data.message)
        );
      }

      return error.message
        ? `${ERRORS.error}: ` + error.message
        : ERRORS.serverError;
    }

    if (error instanceof Error) {
      return error.message
        ? `${ERRORS.error}: ` + error.message
        : ERRORS.serverError;
    }

    return ERRORS.serverError;
  } catch {
    return ERRORS.serverError;
  }
};
