defmodule AttendanceApi.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias AttendanceApi.Repo

  alias AttendanceApi.Accounts.{User, UserToken}

  ## Database getters

  @doc """
  Gets a user by email and password.

  ## Examples

      iex> get_user_by_email_and_password("foo@example.com", "correct_password")
      %User{}

      iex> get_user_by_email_and_password("foo@example.com", "invalid_password")
      nil

  """
  def get_user_by_email_and_password(email, password)
      when is_binary(email) and is_binary(password) do
    user = Repo.get_by(User, email: email)

    if User.valid_password?(user, password), do: user
  end

  ## User registration

  @doc """
  Registers a user.

  ## Examples

      iex> register_user(%{field: value})
      {:ok, %User{}}

      iex> register_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def register_user(attrs) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates a new api token for a user.

  The token returned must be saved somewhere safe.
  This token cannot be recovered from the database.
  """
  def create_user_api_token(user) do
    {encoded_token, user_token} = UserToken.build_email_token(user, "api-token")
    Repo.insert!(user_token)
    encoded_token
  end

  @doc """
  Fetches the user by API token.
  """
  def fetch_user_by_api_token(token) do
    with {:ok, query} <- UserToken.verify_email_token_query(token, "api-token"),
         %User{} = user <- Repo.one(query) do
      {:ok, user}
    else
      _ -> :error
    end
  end

  @doc """
  Deletes a user's API token.

  ## Examples

      iex> delete_user_api_token("valid_token")
      {:ok, %UserToken{}}

      iex> delete_user_api_token("invalid_token")
      {:error, :not_found}

  """
  def delete_user_api_token(token) do
    case Base.url_decode64(token, padding: false) do
      {:ok, decoded_token} ->
        hashed_token = :crypto.hash(:sha256, decoded_token)
        query = from t in UserToken, where: t.token == ^hashed_token
        result = Repo.delete_all(query)
        {:ok, result}
      :error ->
        {:error, "Logout failed!"}
    end
  end

  def all_users() do
    query = from u in User, select: %{email: u.email, role: u.role, id: u.id, name: u.name, position: u.position, is_active: u.is_active}

    query
    |> Repo.all()
  end

  def delete_user(id) do
    {rows_deleted, _} = from(u in User, where: u.id == ^id) |> Repo.delete_all()
    {:ok, rows_deleted}
  end
end
