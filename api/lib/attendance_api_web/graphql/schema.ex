defmodule AttendanceApiWeb.GraphQl.Schema do
  alias AttendanceApi.Accounts.User
  use Absinthe.Schema

  import_types __MODULE__.ContentTypes

  query do
    @desc "Hello world!"
    field :hello_world, :hello_world do
      resolve &hello_world/2
    end
  end

  mutation do
    @desc "Login as user with email and password"
    field :login, :user_token do
      arg :input, non_null(:login_input)

      resolve fn %{input: input}, resolution -> login(input, resolution) end
    end

    @desc "Logout user"
    field :logout, :logout_response do
      resolve &logout/2
    end
  end

  # subscription do
  # end

  def hello_world(_args, %{context: %{current_user: %{email: email}}}), do: {:ok, %{message: "Hello #{email}!"}}
  def hello_world(_args, _resolution), do: {:ok, %{message: "Hello guess!"}}

  def login(%{email: email, password: password}, _resolution) do
    with %User{} = user <- AttendanceApi.Accounts.get_user_by_email_and_password(email, password),
      token <- AttendanceApi.Accounts.create_user_api_token(user) do
      {:ok, %{token: token, email: user.email }}
    else
      _ -> {:error, "Invalid credentials"}
    end
  end

  def logout(_, resolution) do
    case resolution.context do
      %{token: token} when is_binary(token) ->
        case AttendanceApi.Accounts.delete_user_api_token(token) do
          {:ok, _} -> {:ok, %{message: "Logged out successfully"}}
          {:error, _} -> {:error, "Failed to logout"}
        end
      _ ->
        {:error, "No valid token found"}
    end
  end
end
