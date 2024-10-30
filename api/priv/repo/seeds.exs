# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     AttendanceApi.Repo.insert!(%AttendanceApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# AttendanceApi.Accounts.User.create_admin(%{ email: "admin@test.localhost", password: "qweasd123456", name: "-", position: "-", isActive: true, role: "admin"})

admin_user = %{
  email: "admin@example.com",
  name: "Admin User",
  position: "Manager",
  role: "admin"
}

admin_password = System.get_env("ADMIN_PASSWORD") || "password123456"

test_users = [
  %{
    email: "user1@example.com",
    password: "password123456",
    name: "Test User 1",
    position: "Developer"
  },
  %{
    email: "user2@example.com",
    password: "password123456",
    name: "Test User 2",
    position: "Designer"
  },
  %{
    email: "user3@example.com",
    password: "password123456",
    name: "Test User 3",
    position: "QA"
  },
  %{
    email: "user4@example.com",
    password: "password123456",
    name: "Test User 4",
    position: "DevOps"
  },
  %{
    email: "user5@example.com",
    password: "password123456",
    name: "Test User 5",
    position: "Product Manager"
  }
]

case AttendanceApi.Repo.get_by(AttendanceApi.Accounts.User, email: admin_user.email) do
  nil ->
    %AttendanceApi.Accounts.User{}
    |> AttendanceApi.Accounts.User.registration_changeset(Map.put(admin_user, :password, admin_password))
    |> AttendanceApi.Repo.insert!()

  _user ->
    IO.puts("Admin user already exists")
end

Enum.each(test_users, fn user_data ->
  case AttendanceApi.Repo.get_by(AttendanceApi.Accounts.User, email: user_data.email) do
    nil ->
      IO.inspect(user_data)

      %AttendanceApi.Accounts.User{}
      |> AttendanceApi.Accounts.User.registration_changeset(user_data)
      |> AttendanceApi.Repo.insert!()

    _user ->
      IO.puts("Test user #{user_data.email} already exists")
  end
end)

users = AttendanceApi.Repo.all(AttendanceApi.Accounts.User)

Enum.each(users, fn user ->
  start_date = DateTime.utc_now() |> Date.beginning_of_month()
  end_date = DateTime.utc_now() |> Date.end_of_month()

  Enum.filter(Date.range(start_date, end_date), fn date ->
    Date.day_of_week(date) not in [6, 7]  # Filter out Saturdays (6) and Sundays (7)
  end)
  |> Enum.each(fn date ->
    start_hour = Enum.random(7..9)
    end_hour = Enum.random(start_hour + 7..start_hour + 10)
    start_time = DateTime.new!(date, Time.new!(start_hour, 0, 0))
    end_time = DateTime.new!(date, Time.new!(end_hour, 0, 0))

    session_data = %{
      user_id: user.id,
      start_time: start_time,
      end_time: end_time,
      note: ""
    }

    %AttendanceApi.Attendance.Session{}
    |> AttendanceApi.Attendance.Session.changeset(session_data)
    |> AttendanceApi.Repo.insert!()
  end)
end)
