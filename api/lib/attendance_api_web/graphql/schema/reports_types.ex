defmodule AttendanceApiWeb.GraphQl.Schema.ReportsTypes do
  alias AttendanceApiWeb.GraphQl.Middleware
  alias AttendanceApiWeb.Graphql.Resolvers
  use Absinthe.Schema.Notation

  object :work_hours_summary do
    field :user_id, non_null(:string)
    field :work_date, non_null(:string)
    field :total_hours, non_null(:string)
    field :sessions_per_day, non_null(:integer)
  end

  object :reports_queries do
    field :work_hours_report, non_null(list_of(non_null(:work_hours_summary))) do
      arg :user_id, :string
      arg :start_date, non_null(:string)
      arg :end_date, non_null(:string)

      middleware Middleware.Authorize, :any
      resolve &Resolvers.Reports.work_hours_report/3
    end
  end
end
