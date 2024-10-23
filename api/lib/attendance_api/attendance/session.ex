defmodule AttendanceApi.Attendance.Session do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query, warn: false


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

  def for_sessions_with_user() do
    from s in __MODULE__,
      preload: [:user]
  end

  def for_sessions_count() do
    from s in __MODULE__,
      select: count()
  end

  def for_user_sessions(user_id) do
    from s in __MODULE__,
      where: s.user_id == ^user_id
  end

  def for_user_sessions_count(user_id) do
    for_sessions_count()
    |> where([s], s.user_id == ^user_id)
  end

  def where_is_ended(query) do
    where(query, [s], not is_nil(s.end_time))
  end

  def where_is_active(query) do
    where(query, [s], is_nil(s.end_time))
  end

  def where_start_date(query, start_date) do
    where(query, [s], fragment("?::date", s.start_time) == ^start_date)
  end

  defp datetime_now() do
    DateTime.utc_now() |> DateTime.truncate(:second)
  end
end
