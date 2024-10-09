defmodule AttendanceApiWeb.GraphQl.Schema do
  alias AttendanceApiWeb.GraphQl.Middleware
  alias AttendanceApi.Accounts.User
  use Absinthe.Schema

  alias AttendanceApiWeb.Graphql.Resolvers

  import_types __MODULE__.ContentTypes
  import_types __MODULE__.AccountsTypes

  query do
    @desc "Hello world!"
    field :hello_world, :hello_world do
      resolve &hello_world/2
    end

    field :accounts, list_of(non_null(:account)) do
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Users.all/3
    end
  end

  mutation do
    @desc "Login as user with email and password"
    field :login, non_null(:user_token) do
      arg :input, non_null(:login_input)

      resolve fn %{input: input}, resolution -> login(input, resolution) end
    end

    @desc "Logout user"
    field :logout, :logout_response do
      resolve &logout/2
    end

    @desc "Create new user account"
    field :create_account, :account do
      arg :input, non_null(:account_input)
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Users.create_account/3
    end

    @desc "Delete user account"
    field :delete_account, :delete_success_response do
      arg :input, non_null(:string)
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Users.delete_account/3
    end
  end

  # subscription do
  # end

  def hello_world(_args, %{context: %{current_user: %{email: email}}}), do: {:ok, %{message: "Hello #{email}!"}}
  def hello_world(_args, _resolution), do: {:ok, %{message: "Hello guess!"}}

  def login(%{email: email, password: password}, _resolution) do
    with %User{} = user <- AttendanceApi.Accounts.get_user_by_email_and_password(email, password),
      token <- AttendanceApi.Accounts.create_user_api_token(user) do
      {:ok, %{token: token, email: user.email, role: user.role }}
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
