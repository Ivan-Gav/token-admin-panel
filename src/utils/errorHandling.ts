import { AxiosError } from "axios";

const DEFAULT_MESSAGE = "Ошибка сервера";

export const getApiError = (error: unknown) => {
  try {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message?.error) {
        return "Ошибка: " + JSON.stringify(error.response.data.message.error);
      }

      if (error.response?.data?.message) {
        return "Ошибка: " + JSON.stringify(error.response.data.message);
      }

      return error.message ? "Ошибка: " + error.message : DEFAULT_MESSAGE;
    }

    if (error instanceof Error) {
      return error.message ? "Ошибка: " + error.message : DEFAULT_MESSAGE;
    }

    return DEFAULT_MESSAGE;
  } catch {
    return DEFAULT_MESSAGE;
  }
};
