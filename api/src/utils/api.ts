export type SuccessShape<T> = { data: T; error: null };
export type ErrorShape = { data: null; error: { message: string } };

export function sendSuccess<T>(data: T) {
  return { data, error: null } as const;
}

export function sendError(message: string) {
  return { data: null, error: { message } } as const;
}
