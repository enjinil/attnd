defmodule AttendanceApiWeb.Graphql.Resolvers.Sessions do
  alias AttendanceApi.Repo
  alias AttendanceApi.Attendance.Session

  import Ecto.Query, warn: false

  @doc """
  Starts a new session for the current user.
  Returns the existing active session if one exists, otherwise creates a new session.
  """
  def start_user_session(_, _, resolution) do
    with %{current_user: current_user} <- resolution.context do
      case active_session_by_user(current_user.id) do
        nil -> %Session{}
        |> Session.start_changeset(%{ user_id: current_user.id })
        |> Repo.insert()
        session -> {:ok, session}
      end
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  @doc """
  Retrieves the current user's active session if one exists.
  """
  def user_active_session(_, _, resolution) do
    with %{current_user: current_user} <- resolution.context do
      {:ok, active_session_by_user(current_user.id)}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  @doc """
  Ends the current user's active session.

  ## Arguments
  - `args`: Map containing `:note` field for session end note
  """
  def end_user_session(_, args, resolution) do
    with %{current_user: current_user} <- resolution.context do
      case active_session_by_user(current_user.id) do
        nil -> {:ok, nil}
        session -> session |> Session.end_changeset(%{note: args.note}) |> Repo.update()
      end
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  @doc """
  Retrieves all sessions for the current user that started today.
  """
  def user_today_sessions(_, _, resolution) do
    with %{current_user: current_user} <- resolution.context do
      query = Session.for_user_sessions(current_user.id)
        |> Session.where_start_date(Date.utc_today())

        {:ok, Repo.all(query)}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  @doc """
  Retrieves paginated ended sessions for the current user.
  """
  def user_sessions(_, args, resolution) do
    with %{current_user: current_user} <- resolution.context do
      page = get_params_field(args, :page, 1)
      offset = (page - 1) * 10

      query = Session.for_user_sessions(current_user.id)
      |> Session.where_is_ended()
      |> order_by([s], desc: s.id)
      |> limit(10)
      |> offset(^offset)
      |> maybe_filter_by_start_date(args)

      {:ok, Repo.all(query)}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  @doc """
  Counts total number of ended sessions for the current user.
  """
  def user_total_sessions(_, args, resolution) do
    with %{current_user: current_user} <- resolution.context do
      count = Session.for_user_sessions_count(current_user.id)
      |> Session.where_is_ended()
      |> maybe_filter_by_start_date(args)
      |> Repo.one()

      {:ok, %{count: count}}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  @doc """
  Admin query to retrieve all sessions by start date.
  """
  def sessions_by_start_date(_, args, _) do
    if (get_params_field(args, :start_date) == "") do
      {:ok, []}
    else
      query = Session.for_sessions_with_user()
        |> order_by([s], desc: s.id)
        |> maybe_filter_by_start_date(args)

      {:ok, Repo.all(query)}
    end
  end

  @doc """
  Admin query to count total sessions by start date.
  """
  def total_sessions_by_start_date(_, args, _) do
    if (get_params_field(args, :start_date) == "") do
      {:ok, %{count: 0}}
    else
      count = Session.for_sessions_count()
      |> maybe_filter_by_start_date(args)
      |> Repo.one()

      {:ok, %{count: count}}
    end
  end

  @doc """
  Admin query to retrieve paginated sessions for a specific user.
  """
  def sessions_by_user_id(_, args, _) do
    page = get_params_field(args, :page, 1)
    offset = (page - 1) * 10

    query = Session.for_user_sessions(args.id)
    |> Session.where_is_ended()
    |> order_by([s], desc: s.id)
    |> limit(10)
    |> offset(^offset)
    |> maybe_filter_by_start_date(args)

    {:ok, Repo.all(query)}
  end

  @doc """
  Admin query to count total sessions for a specific user.
  """
  def total_sessions_by_user_id(_, args, _) do
    count = Session.for_user_sessions_count(args.id)
    |> Session.where_is_ended()
    |> maybe_filter_by_start_date(args)
    |> Repo.one()

    {:ok, %{count: count}}
  end

  defp maybe_filter_by_start_date(query, params) do
    date_string = get_params_field(params, :start_date)

    if date_string not in [nil, ""] do
      query |> Session.where_start_date(parse_date(date_string))
    else
      query
    end
  end

  @doc """
  Safely get fields from nested params map.
  """
  defp get_params_field(params, field, default \\ "") do
    params
    |> Map.get(:params, %{})
    |> Map.get(field, default)
  end

  @doc """
  Retrieve active session for a user.
  """
  defp active_session_by_user(user_id) do
    Session.for_user_sessions(user_id)
    |> Session.where_is_active()
    |> Repo.one()
  end

  @doc """
  Parse date string into Date struct.

  ## Arguments
  - `date_string`: ISO 8601 formatted date string (YYYY-MM-DD or YYYY/MM/DD)

  ## Returns
  - `Date` struct

  ## Raises
  - `Date.ParseError` if the date string is invalid
  """
  defp parse_date(date_string) do
    date_string
    |> String.replace("/", "-") # In case "/" is used as separator
    |> Date.from_iso8601!()
  end
end
