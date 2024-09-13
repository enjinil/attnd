defmodule AttendanceApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      AttendanceApiWeb.Telemetry,
      AttendanceApi.Repo,
      {DNSCluster, query: Application.get_env(:attendance_api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: AttendanceApi.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: AttendanceApi.Finch},
      # Start a worker by calling: AttendanceApi.Worker.start_link(arg)
      # {AttendanceApi.Worker, arg},
      # Start to serve requests, typically the last entry
      AttendanceApiWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: AttendanceApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    AttendanceApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
