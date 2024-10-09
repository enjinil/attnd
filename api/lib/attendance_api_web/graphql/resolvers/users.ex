defmodule AttendanceApiWeb.Graphql.Resolvers.Users do
  alias AttendanceApi.Accounts

  def all(_, _args, _) do
    {:ok, AttendanceApi.Accounts.all_users()}
  end

  def create_account(_, %{input: params}, _) do
    case Accounts.register_user(params) do
      {:error, _} ->
        {:error, "Could not create user"}
      {:ok, _} = success ->
        success
    end
  end
end
