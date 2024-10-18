/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "graphql-ws";
import { env } from "../config";
import { TypedDocumentString } from "../graphql/graphql";
import { useEffect } from "react";

// Reuse existing GraphQL types
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
  data?: T | null;
};

type GqlErrorResponse = {
  errors: GqlError[];
};

interface SubscriptionOptions<TData, TVariables> {
  variables?: TVariables;
  onReceive?: (result: GqlSuccessResponse<TData>) => void;
  onError?: (error: GqlErrorResponse) => void;
  onComplete?: () => void;
}

const wsUrl = `${env.GRAPHQL_API_URL.replace(/^http/, "ws")}-ws`;
const client = createClient({ url: wsUrl });

/**
 * Custom hook for GraphQL subscriptions
 * @param document - GraphQL subscription document
 * @param options - Subscription options including variables and callbacks
 * @returns AsyncIterator for the subscription
 */
function useSubscription<TResult = any, TVariables = Record<string, never>>(
  document: TypedDocumentString<TResult, TVariables> | string,
  options: SubscriptionOptions<TResult, TVariables>
): void {
  const { variables, onReceive, onError, onComplete } = options;

  useEffect(() => {
    // Create subscription iterator
    const subscription = client.iterate<TResult>({
      query: typeof document === "string" ? document : document.toString(),
      variables: variables as Record<string, any>,
    });

    (async () => {
      try {
        for await (const result of subscription) {
          if (
            "errors" in result &&
            Array.isArray(result.errors) &&
            result.errors.length > 0
          ) {
            const errorResponse: GqlErrorResponse = { errors: result.errors };
            onError?.(errorResponse);
            continue;
          }

          if ("data" in result) {
            onReceive?.({ data: result.data });
            continue;
          }

          console.error("Unexpected response format:", result);
        }
      } catch (error) {
        console.error("Subscription error:", error);
        if (error instanceof Error) {
          onError?.({
            errors: [
              {
                message: error.message,
                path: [],
                locations: [],
              },
            ],
          });
        }
      } finally {
        onComplete?.();
      }
    })();

    return () => {
      subscription.return?.();
    };
  }, []);
}

export { useSubscription };
