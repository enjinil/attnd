defmodule AttendanceApiWeb.UserSocket do
  use Phoenix.Socket
  use Absinthe.Phoenix.Socket,
  schema: AttendanceApiWeb.GraphQl.Schema

  alias AttendanceApi.Accounts

  def connect(params, socket) do
    with "Bearer " <> token <- Map.get(params, "Authorization"),
    {:ok, current_user} <- Accounts.fetch_user_by_api_token(token) do
      socket = Absinthe.Phoenix.Socket.put_options(socket, context: %{
        current_user: current_user
      })
      {:ok, socket}
    else
      _user_id_missing_or_incorrect -> {:error, "Unauthorized!"}
    end
  end

  def id(_socket), do: nil
end
