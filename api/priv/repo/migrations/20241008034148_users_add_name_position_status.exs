defmodule AttendanceApi.Repo.Migrations.UsersAddNamePositionStatus do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :name, :string, null: false, default: "-"
      add :position, :string, null: false, default: "-"
      add :is_active, :boolean, default: true
    end
  end
end
