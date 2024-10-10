defmodule AttendanceApiWeb.Graphql.Resolvers.Users do
  alias AttendanceApi.Accounts

  def all(_, args, _) do
    IO.inspect(Map.get(args, :query))
    {:ok, AttendanceApi.Accounts.all_users(Map.get(args, :query))}
  end

  def fetch_user_by_id(_, %{id: id}, _) do
    case Accounts.fetch_user_by_id(id) do
      {:error, _} ->
        {:error, "User not found!"}
      {:ok, user} = _ ->
        {:ok, user}
    end
  end

  def create_account(_, %{input: params}, _) do
    case Accounts.register_user(params) do
      {:error, _} ->
        {:error, "Could not create user"}
      {:ok, _} = success ->
        success
    end
  end

  def update_account(_, %{input: params, id: id}, _) do
    case Accounts.update_user(id, params) do
      {:error, _} ->
        {:error, "Could not update user"}
      {:ok, _} = success ->
        success
    end
  end

  def delete_account(_, %{input: id}, _) do
    case Accounts.delete_user(id) do
      {:error, _} ->
        {:error, "Could not delete user"}
      {:ok, _} = _ ->
        {:ok, %{message: "Successfully deleted user!"}}
    end
  end
end
