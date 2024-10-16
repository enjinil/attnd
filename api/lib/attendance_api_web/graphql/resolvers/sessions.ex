defmodule AttendanceApiWeb.Graphql.Resolvers.Sessions do
  alias AttendanceApi.Repo
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
      offset = (get_page(args) - 1) * 10

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

  defp maybe_filter_by_start_date(query, params) do
    date_string = params
    |> Map.get(:query, %{})
    |> Map.get(:start_date, 1)

    if date_string not in [nil, ""] do
      query |> where([s], fragment("?::date", s.start_time) == ^Date.from_iso8601!(date_string |> String.replace("/", "-")))
    else
      query
    end
  end

  defp get_page(params \\ %{}) do
    params
    |> Map.get(:query, %{})
    |> Map.get(:page, 1)
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
