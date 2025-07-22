import { Alert } from "react-native";

export const handleApiError = (error: any) => {
  let message = "Произошла непредвиденная ошибка";

  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = "Некорректный запрос. Пожалуйста, проверьте введённые данные.";
        break;
      case 401:
        message = "Ошибка аутентификации. Пожалуйста, войдите снова.";
        break;
      case 403:
        message = "У вас нет прав для выполнения этого действия.";
        break;
      case 404:
        message = "Запрошенный ресурс не найден.";
        break;
      case 422:
        message = error.response.data?.message || "Произошла ошибка валидации.";
        break;
      case 500:
        message = "Ошибка сервера. Пожалуйста, попробуйте позже.";
        break;
      default:
        message = error.response.data?.message || "Произошла сетевая ошибка.";
    }
  } else if (error.request) {
    message =
      "Сбой сетевого соединения. Пожалуйста, проверьте подключение к интернету.";
  } else if (error.message) {
    message = error.message;
  }

  return message;
};

export const showErrorAlert = (error: any, title: string = "Ошибка") => {
  const message = handleApiError(error);
  Alert.alert(title, message);
};

export const logError = (error: any, context: string) => {
  console.error(`[${context}] Error:`, error);

  if (__DEV__) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
    });
  }
};
