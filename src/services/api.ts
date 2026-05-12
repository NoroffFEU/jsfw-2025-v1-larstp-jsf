export const NOROFF_API_BASE_URL = "https://v2.api.noroff.dev";

export type ApiQueryValue = string | number | boolean | null | undefined;

export type ApiErrorItem = {
  code?: string;
  message: string;
  path?: string[];
};

export type ApiErrorResponse = {
  errors: ApiErrorItem[];
  status: string;
  statusCode: number;
};

export type ApiMeta = Record<string, unknown>;

export type ApiResponse<T> = {
  data: T;
  meta: ApiMeta;
};

export class ApiRequestError extends Error {
  readonly statusCode: number;
  readonly status: string;
  readonly errors: ApiErrorItem[];

  constructor(payload: ApiErrorResponse) {
    super(payload.errors[0]?.message ?? payload.status);
    this.name = "ApiRequestError";
    this.statusCode = payload.statusCode;
    this.status = payload.status;
    this.errors = payload.errors;
  }
}

function buildQueryString(query?: Record<string, ApiQueryValue>) {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function buildApiUrl(
  path: string,
  query?: Record<string, ApiQueryValue>,
) {
  return `${NOROFF_API_BASE_URL}${path}${buildQueryString(query)}`;
}

// Trying a new thing. Scrimba course says this is more DRY
export async function request<T>(
  path: string,
  options: RequestInit = {},
  query?: Record<string, ApiQueryValue>,
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path, query), {
    ...options,
    headers,
  });

  const rawBody = await response.text();
  const body = rawBody ? (JSON.parse(rawBody) as unknown) : null;

  if (!response.ok) {
    const errorResponse = body as Partial<ApiErrorResponse> | null;
    const payload: ApiErrorResponse = {
      errors: errorResponse?.errors ?? [
        {
          message: `Request failed with status ${response.status}`,
        },
      ],
      status: errorResponse?.status ?? response.statusText,
      statusCode: errorResponse?.statusCode ?? response.status,
    };

    throw new ApiRequestError(payload);
  }

  return body as T;
}
