defmodule AttendanceApiWeb.Graphql.Resolvers.Reports do
  alias AttendanceApi.Repo
  alias AttendanceApi.Attendance.Session

  import Ecto.Query, warn: false

  def work_hours_report(_, args, resolution) do
    with %{current_user: current_user} <- resolution.context do
      user_id = if current_user.role == "admin", do: args.user_id, else: current_user.id
      {:ok, get_daily_summary(user_id, Date.from_iso8601!(args.start_date), Date.from_iso8601!(args.end_date))}
    else
      _ -> {:error, "Unauthorized!"}
    end
  end

  defp get_daily_summary(user_id, start_date, end_date) do
    from(s in Session,
      where: fragment("DATE(?)", s.start_time) >= ^start_date,
      where: fragment("DATE(?)", s.start_time) <= ^end_date,
      where: s.user_id == ^user_id,
      group_by: [s.user_id, fragment("DATE(?)", s.start_time)],
      select: %{
        user_id: s.user_id,
        work_date: fragment("DATE(?)", s.start_time),
        sessions_per_day: count(s.id),
        total_hours: fragment(
          "ROUND(CAST(SUM(EXTRACT(EPOCH FROM (? - ?)))/3600 as numeric), 2)",
          s.end_time,
          s.start_time
        )
      },
      order_by: [s.user_id, fragment("DATE(?)", s.start_time)]
    )
    |> Repo.all()
  end
end
