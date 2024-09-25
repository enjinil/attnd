import { env } from "../config";
import { TypedDocumentString } from "../graphql/graphql";

type GqlErrorLocation = {
  line: number;
  column: number;
};

type GqlError = {
  message: string;
  path: string[];
  locations: GqlErrorLocation[];
};

type GqlSuccessResponse<T> = {
  data: T;
};

type GqlErrorResponse = {
  errors: GqlError[];
};

export async function gqlRequest<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TResult = any,
  TVariables = Record<string, never>
>(
  document: TypedDocumentString<TResult, TVariables> | string,
  variables?: TVariables
): Promise<GqlSuccessResponse<TResult>> {
  const response = await fetch(env.GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      query: document,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json = await response.json();

  if (
    "errors" in json &&
    Array.isArray(json.errors) &&
    json.errors.length > 0
  ) {
    const errorResponse: GqlErrorResponse = { errors: json.errors };
    throw errorResponse;
  }

  if ("data" in json) {
    return json as GqlSuccessResponse<TResult>;
  }

  throw new Error("Unexpected response format");
}
