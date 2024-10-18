defmodule AttendanceApiWeb.GraphQl.Schema.SessionsTypes do
  use Absinthe.Schema.Notation

  object :session do
    field :id, non_null(:string)
    field :start_time, non_null(:string)
    field :end_time, :string
    field :note, :string
    field :user_id, non_null(:string)
  end

  object :session_with_user do
    field :id, non_null(:string)
    field :start_time, non_null(:string)
    field :end_time, :string
    field :note, :string
    field :user_id, non_null(:string)
    field :user, non_null(:session_user)
  end

  object :session_user do
    field :id, non_null(:string)
    field :email, non_null(:string)
    field :name, non_null(:string)
    field :position, non_null(:string)
  end

  input_object :sessions_params do
    field :start_date, non_null(:string)
    field :page, non_null(:integer)
  end

  input_object :user_sessions_params do
    field :start_date, non_null(:string)
  end
end
