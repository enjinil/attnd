defmodule AttendanceApi.Repo do
  use Ecto.Repo,
    otp_app: :attendance_api,
    adapter: Ecto.Adapters.Postgres
end
