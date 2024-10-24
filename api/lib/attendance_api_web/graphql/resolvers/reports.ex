defmodule AttendanceApiWeb.Graphql.Resolvers.Reports do
  alias AttendanceApiWeb.Helpers
  alias AttendanceApi.Repo
  alias AttendanceApi.Attendance.Session

  import Ecto.Query, warn: false

  def work_hours_report(_, args, resolution) do
    with {:ok, user_id} <- Helpers.authorize_and_get_user_id(resolution.context, args),
         {:ok, date_range} <- parse_date_range(args) do
      {:ok, fetch_work_hours(user_id, date_range)}
    end
  end

  defp parse_date_range(%{start_date: start_date, end_date: end_date}) do
    {:ok, {
      Helpers.parse_date(start_date),
      Helpers.parse_date(end_date)
    }}
  end

  defp fetch_work_hours(user_id, {start_date, end_date}) do
    user_id
    |> Session.for_daily_work_hours(start_date, end_date)
    |> Repo.all()
  end
end
