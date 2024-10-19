defmodule AttendanceApiWeb.Graphql.Resolvers.Sessions do
  alias AttendanceApi.Repo
  alias AttendanceApi.Accounts.User
  alias AttendanceApi.Attendance.Session

  import Ecto.Query, warn: false

  def start_session(_, _, resolution) do
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

  def active_session(_, _, resolution) do
    with %{current_user: current_user} <- resolution.context do
      {:ok, active_session_by_user(current_user.id)}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  def end_session(_, _, resolution) do
    with %{current_user: current_user} <- resolution.context do
      case active_session_by_user(current_user.id) do
        nil -> {:ok, nil}
        session -> session |> IO.inspect() |> Session.end_changeset(%{note: ""}) |> Repo.update()
      end
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  def today_sessions(_, _, resolution) do
    with %{current_user: current_user} <- resolution.context do
      query = user_sessions_query(current_user.id)
        |> where([s], fragment("?::date", s.start_time) == ^Date.utc_today())

        {:ok, Repo.all(query)}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  def sessions(_, args, resolution) do
    with %{current_user: current_user} <- resolution.context do
      page = get_params_field(args, :page, 1)
      offset = (page - 1) * 10

      query = user_sessions_query(current_user.id)
      |> where([s], not is_nil(s.end_time))
      |> order_by([s], desc: s.id)
      |> limit(10)
      |> offset(^offset)
      |> maybe_filter_by_start_date(args)

      {:ok, Repo.all(query)}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  def total_sessions(_, args, resolution) do
    with %{current_user: current_user} <- resolution.context do
      query = from s in Session, select: count(), where: s.user_id == ^current_user.id and not is_nil(s.end_time)
      count = query |> maybe_filter_by_start_date(args) |> Repo.one()

      {:ok, %{count: count}}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  def user_sessions(_, args, _) do
    if (get_params_field(args, :start_date) == "") do
      {:ok, []}
    else
      user_query = from u in User, select: struct(u, [:id, :email, :name, :position])
      sessions_query = (from s in Session, select: struct(s, [:id, :start_time, :end_time, :note, :user_id]))
        |> order_by([s], desc: s.id)
        |> maybe_filter_by_start_date(args)

      query = from s in sessions_query,
        preload: [user: ^user_query]

      {:ok, Repo.all(query)}
    end
  end

  def total_user_sessions(_, args, _) do
    if (get_params_field(args, :start_date) == "") do
      {:ok, %{count: 0}}
    else
      query = from s in Session, select: count()
      count = query |> maybe_filter_by_start_date(args) |> Repo.one()

      {:ok, %{count: count}}
    end
  end

  def sessions_by_user_id(_, args, _) do
    page = get_params_field(args, :page, 1)
    offset = (page - 1) * 10

    query = user_sessions_query(args.id)
    |> where([s], not is_nil(s.end_time))
    |> order_by([s], desc: s.id)
    |> limit(10)
    |> offset(^offset)
    |> maybe_filter_by_start_date(args)

    {:ok, Repo.all(query)}
  end

  def total_sessions_by_user_id(_, args, _) do
    query = from s in Session, select: count(), where: s.user_id == ^args.id and not is_nil(s.end_time)
    count = query |> maybe_filter_by_start_date(args) |> Repo.one()

    {:ok, %{count: count}}
  end

  defp maybe_filter_by_start_date(query, params) do
    date_string = get_params_field(params, :start_date)

    if date_string not in [nil, ""] do
      query |> where([s], fragment("?::date", s.start_time) == ^Date.from_iso8601!(date_string |> String.replace("/", "-")))
    else
      query
    end
  end

  defp get_params_field(params, field, default \\ "") do
    params
    |> Map.get(:params, %{})
    |> Map.get(field, "")
  end

  defp active_session_by_user(user_id) do
    user_sessions_query(user_id)
    |> where([s], is_nil(s.end_time))
    |> Repo.one()
  end


  defp user_sessions_query(user_id) do
    from s in Session,
      select: %Session{id: s.id, start_time: s.start_time, end_time: s.end_time, note: s.note, user_id: s.user_id},
      where: s.user_id == ^user_id
  end
end
