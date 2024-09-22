defmodule AttendanceApiWeb.FetchUserPlug do
  @behaviour Plug

  import Plug.Conn
  alias AttendanceApi.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
      {:ok, user} <- Accounts.fetch_user_by_api_token(token) do
      Absinthe.Plug.assign_context(conn, :current_user, user)
      |> Absinthe.Plug.assign_context(:token, token)
    else
      _user_id_missing_or_incorrect -> conn
    end
  end
end
