defmodule AttendanceApiWeb.Router do
  use AttendanceApiWeb, :router

  alias AttendanceApiWeb.FetchUserPlug
  alias AttendanceApiWeb.TestsController

  pipeline :graphql do
    plug :accepts, ["json"]
    plug CORSPlug, origin: "*"
    plug FetchUserPlug
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug, origin: "*"
  end

  scope "/", AttendanceApiWeb do
    pipe_through :graphql
    forward "/api", GraphQl.Router
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:attendance_api, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: AttendanceApiWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  if Mix.env in [:dev, :test] do
    scope "/test" do
      pipe_through [:api]
      delete "/reset-database", TestsController, :reset_database
	    post "/create-account", TestsController, :create_account
    end
  end
end
