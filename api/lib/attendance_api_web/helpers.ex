defmodule AttendanceApiWeb.Helpers do
  @doc """
  Authorizes the request and returns the appropriate user ID based on the user's role.

  ## Parameters
    * `context` - Map containing the current user's information
    * `args` - Map that may contain a target user_id

  ## Returns
    * `{:ok, integer()}` - Tuple containing the authorized user ID
    * `{:error, String.t()}` - Error tuple if authorization fails

  ## Examples

      # For admin users
      iex> context = %{current_user: %{role: "admin"}}
      iex> args = %{user_id: 123}
      iex> authorize_and_get_user_id(context, args)
      {:ok, 123}

      # For regular users
      iex> context = %{current_user: %{id: 456}}
      iex> authorize_and_get_user_id(context, %{})
      {:ok, 456}

      # For unauthorized access
      iex> authorize_and_get_user_id(%{}, %{})
      {:error, "Unauthorized!"}
  """
  def authorize_and_get_user_id(%{current_user: %{role: "admin"}}, %{user_id: user_id}),
    do: {:ok, user_id}
  def authorize_and_get_user_id(%{current_user: %{id: user_id}}, _args),
    do: {:ok, user_id}
  def authorize_and_get_user_id(_, _),
    do: {:error, "Unauthorized!"}

  @doc """
  Parse date string into Date struct.

  ## Arguments
  - `date_string`: ISO 8601 formatted date string (YYYY-MM-DD or YYYY/MM/DD)

  ## Returns
  - `Date` struct

  ## Raises
  - `Date.ParseError` if the date string is invalid

  ## Examples

    iex> parse_date("2024-10-25")
    ~D[2024-10-25]

    iex> parse_date("2024/10/25")
    ~D[2024-10-25]

    # Will raise Date.ParseError
    iex> parse_date("invalid-date")
    ** (Date.ParseError) cannot parse "invalid-date" as date, reason: :invalid_format
  """
  def parse_date(date_string) do
    date_string
    |> String.replace("/", "-") # In case "/" is used as separator
    |> Date.from_iso8601!()
  end
end
