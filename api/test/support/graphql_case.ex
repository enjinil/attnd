defmodule AttendanceApiWeb.GraphQlCase do
  use ExUnit.CaseTemplate

  using do
    quote do
      use AttendanceApiWeb.ConnCase

      def gql_post(options, response \\ 200)
      def gql_post(%{token: token} = options, response) do
        build_conn()
        |> put_req_header("authorization", "Bearer " <> token)
        |> gql_post_with_conn(options, response)
      end

      def gql_post(options, response) do
        build_conn()
        |> gql_post_with_conn(options, response)
      end

      defp gql_post_with_conn(conn, options, response) do
        conn
        |> put_resp_content_type("application/json")
        |> post("/api/graphql", options)
        |> json_response(response)
      end
    end
  end
end
