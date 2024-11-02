defmodule AttendanceApiWeb.TestsController do
  use AttendanceApiWeb, :controller

  alias AttendanceApi.Repo
  alias AttendanceApi.Accounts
  alias Ecto.Adapters.SQL

  @doc """
  Resets the database to a clean state by truncating all tables.
  This is useful for testing to ensure a clean state between test runs.

  Note: This will remove ALL data from the database. Use with caution.
  """
  def reset_database(conn, _params) do
    # Get all table names from the database, excluding system tables
    {:ok, %{rows: tables}} =
      SQL.query(
        Repo,
        """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        AND table_name NOT IN ('schema_migrations')
        """
      )

    # Disable foreign key constraints temporarily
    Repo.query!("SET session_replication_role = 'replica';")

    # Truncate all tables in a single transaction
    Repo.transaction(fn ->
      tables
      |> List.flatten()
      |> Enum.each(fn table ->
        Repo.query!("TRUNCATE TABLE #{table} CASCADE;")
      end)
    end)

    # Re-enable foreign key constraints
    Repo.query!("SET session_replication_role = 'origin';")

    send_resp(conn, :no_content, "")
  end

  @doc """
  Creates a test user account with specified email, password, and role.
  Additional fields are set to test default values.
  """
  def create_account(conn, %{"email" => email, "password" => password, "role" => role}) do
    account = %{
      email: email,
      password: password,
      role: role,
      position: "Test",
      name: "Test",
      is_active: true
    }

    case Accounts.register_user(account) do
      {:ok, _} -> send_resp(conn, 200, "Created!")
      _ -> send_resp(conn, 500, "Error!")
    end
  end
end
