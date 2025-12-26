
import { BackendValidationErrors } from "@/lib/apiClient.";

export function isApiValidationError(error: unknown): error is ApiValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "error_name" in error &&
    (error as { error_name: string }).error_name === "VALIDATION_ERROR"
  );
}

export interface ApiValidationError {
  error_name: "VALIDATION_ERROR";
  message: string;
  errors: BackendValidationErrors;
  status: number;
}
