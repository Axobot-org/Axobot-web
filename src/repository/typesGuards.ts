interface FetchError {
  message: string;
  code: number;
}

export function isFetchError(obj: unknown): obj is FetchError {
  return typeof obj === "object" && obj !== null && "message" in obj;
}

export function isBuildingServerPage() {
  return typeof window === "undefined";
}