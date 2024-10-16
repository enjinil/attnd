defmodule AttendanceApiWeb.GraphQl.Schema.SessionsTypes do
  use Absinthe.Schema.Notation

  object :session do
    field :id, non_null(:string)
    field :start_time, non_null(:string)
    field :end_time, :string
    field :note, :string
    field :user_id, non_null(:string)
  end

  input_object :sessions_query do
    field :start_date, non_null(:string)
    field :page, non_null(:integer)
  end
end
