defmodule AttendanceApi.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :start_time, :timestamptz, null: false
      add :end_time, :timestamptz
      add :note, :string
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    # Add check constraint to ensure start_time is before end_time
    create constraint(:sessions, :start_time_before_end_time,
      check: "start_time < end_time OR end_time IS NULL"
    )
  end
end
