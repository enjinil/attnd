import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { gqlRequest } from "./graphql-client";

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variable
vi.mock("../config", () => ({
  env: {
    GRAPHQL_API_URL: "https://api.example.com/graphql",
  },
}));

describe("gqlRequest", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return data on successful request", async () => {
    const mockResponse = {
      ok: true,
      json: vi
        .fn()
        .mockResolvedValue({ data: { user: { id: 1, name: "John Doe" } } }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const query = `query GetUser { user { id name } }`;
    const result = await gqlRequest(query);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/graphql",
      expect.any(Object)
    );
    expect(result).toEqual({ data: { user: { id: 1, name: "John Doe" } } });
  });

  it("should throw GqlErrorResponse on GraphQL errors", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        errors: [
          {
            message: "User not found",
            path: ["user"],
            locations: [{ line: 1, column: 1 }],
          },
        ],
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const query = `query GetUser { user { id name } }`;
    await expect(gqlRequest(query)).rejects.toEqual({
      errors: [
        {
          message: "User not found",
          path: ["user"],
          locations: [{ line: 1, column: 1 }],
        },
      ],
    });
  });

  it("should throw Error on network failure", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const query = `query GetUser { user { id name } }`;
    await expect(gqlRequest(query)).rejects.toThrow("Network error");
  });

  it("should throw Error on non-ok response", async () => {
    const mockResponse = {
      ok: false,
    };
    mockFetch.mockResolvedValue(mockResponse);

    const query = `query GetUser { user { id name } }`;
    await expect(gqlRequest(query)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("should throw Error on unexpected response format", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({}), // Neither data nor errors
    };
    mockFetch.mockResolvedValue(mockResponse);

    const query = `query GetUser { user { id name } }`;
    await expect(gqlRequest(query)).rejects.toThrow(
      "Unexpected response format"
    );
  });
});
