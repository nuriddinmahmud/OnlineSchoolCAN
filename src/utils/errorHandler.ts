import { Alert } from "react-native";

export const handleApiError = (error: any) => {
  let message = "An unexpected error occurred";

  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = "Invalid request. Please check your input.";
        break;
      case 401:
        message = "Authentication failed. Please login again.";
        break;
      case 403:
        message = "You do not have permission to perform this action.";
        break;
      case 404:
        message = "The requested resource was not found.";
        break;
      case 422:
        message = error.response.data?.message || "Validation error occurred.";
        break;
      case 500:
        message = "Server error. Please try again later.";
        break;
      default:
        message = error.response.data?.message || "Network error occurred.";
    }
  } else if (error.request) {
    message =
      "Network connection failed. Please check your internet connection.";
  } else if (error.message) {
    message = error.message;
  }

  return message;
};

export const showErrorAlert = (error: any, title: string = "Error") => {
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
