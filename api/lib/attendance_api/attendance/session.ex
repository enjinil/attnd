defmodule AttendanceApi.Attendance.Session do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sessions" do
    field :start_time, :utc_datetime
    field :end_time, :utc_datetime
    field :note, :string
    belongs_to :user, AttendanceApi.Accounts.User

    timestamps(type: :utc_datetime)
  end

  def start_changeset(session, attrs) do
    session
    |> cast(attrs, [:user_id])
    |> put_change(:start_time, datetime_now())
    |> validate_required([:start_time, :user_id])
  end

  def end_changeset(session, attrs) do
    session
    |> cast(attrs, [:note])
    |> put_change(:end_time, datetime_now())
    |> validate_required([:start_time, :end_time, :user_id])
  end

  defp datetime_now() do
    DateTime.utc_now() |> DateTime.truncate(:second)
  end
end
