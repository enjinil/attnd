defmodule AttendanceApiWeb.GraphQl.Schema.SessionsTypes do
  use Absinthe.Schema.Notation

  alias AttendanceApiWeb.GraphQl.Middleware
  alias AttendanceApi.Accounts
  alias AttendanceApiWeb.Graphql.Resolvers

  object :session do
    field :id, non_null(:string)
    field :start_time, non_null(:string)
    field :end_time, :string
    field :note, :string
    field :user_id, non_null(:string)
  end

  object :session_with_user do
    field :id, non_null(:string)
    field :start_time, non_null(:string)
    field :end_time, :string
    field :note, :string
    field :user_id, non_null(:string)
    field :user, non_null(:session_user)
  end

  object :session_user do
    field :id, non_null(:string)
    field :email, non_null(:string)
    field :name, non_null(:string)
    field :position, non_null(:string)
  end

  input_object :paginated_sessions_params do
    field :start_date, non_null(:string)
    field :page, non_null(:integer)
  end

  input_object :sessions_params do
    field :start_date, non_null(:string)
  end

  object :sessions_queries do
    field :user_today_sessions, list_of(:session) do
      middleware Middleware.Authorize, "user"
      resolve &Resolvers.Sessions.today_sessions/3
    end

    @desc "Get active user session"
    field :user_active_session, :session do
      middleware Middleware.Authorize, "user"
      resolve &Resolvers.Sessions.active_session/3
    end

    field :user_sessions, list_of(non_null(:session)) do
      arg :params, :paginated_sessions_params
      middleware Middleware.Authorize, "user"
      resolve &Resolvers.Sessions.sessions/3
    end

    field :user_total_sessions, non_null(:count) do
      arg :params, :paginated_sessions_params
      middleware Middleware.Authorize, "user"
      resolve &Resolvers.Sessions.total_sessions/3
    end

    field :sessions, list_of(non_null(:session_with_user)) do
      arg :params, :sessions_params
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Sessions.user_sessions/3
    end

    field :total_sessions, non_null(:count) do
      arg :params, :sessions_params
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Sessions.total_user_sessions/3
    end

    field :sessions_by_user_id, list_of(non_null(:session)) do
      arg :id, :string
      arg :params, :paginated_sessions_params
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Sessions.sessions_by_user_id/3
    end

    field :total_sessions_by_user_id, non_null(:count) do
      arg :id, :string
      arg :params, :paginated_sessions_params
      middleware Middleware.Authorize, "admin"
      resolve &Resolvers.Sessions.total_sessions_by_user_id/3
    end
  end

  object :sessions_mutations do
    @desc "Create user session or return active session"
    field :start_user_session, non_null(:session) do
      middleware Middleware.Authorize, "user"
      resolve &Resolvers.Sessions.start_session/3
    end

    @desc "End active user session"
    field :end_user_session, :session do
      arg :note, :string
      middleware Middleware.Authorize, "user"
      resolve &Resolvers.Sessions.end_session/3
    end
  end

  object :sessions_subscriptions do
    field :updated_sessions, :session do
      arg :token, non_null(:string)

      config fn args, _ ->
        case Accounts.fetch_user_by_api_token(args.token) do
          {:ok, %{role: "admin"} } ->
            {:ok, topic: "*"}
          _ ->
            {:error, "unauthorized"}
        end
      end

      trigger [:start_session, :end_session], topic: fn _ ->
        ["*"]
      end

      resolve fn root, _, _ ->
        IO.inspect(root)
        {:ok, root}
      end
    end
  end
end
