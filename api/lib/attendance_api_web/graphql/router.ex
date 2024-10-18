defmodule AttendanceApiWeb.GraphQl.Router do
  use Plug.Router

  plug :match
  plug :dispatch

  forward "/graphiql",
    to: Absinthe.Plug.GraphiQL,
    init_opts: [
      interface: :playground,
      schema: AttendanceApiWeb.GraphQl.Schema,
      socket: AttendanceApiWeb.UserSocket
    ]

  forward "/",
    to: Absinthe.Plug,
    init_opts: [
      schema: AttendanceApiWeb.GraphQl.Schema,
    ]
end
