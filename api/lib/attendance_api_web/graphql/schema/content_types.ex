defmodule AttendanceApiWeb.GraphQl.Schema.ContentTypes do
  use Absinthe.Schema.Notation

  input_object :login_input do
    field :email, non_null(:string)
    field :password, non_null(:string)
  end

  object :hello_world do
    field :message, :string
  end

  object :user_token do
    field :token, non_null(:string)
    field :email, non_null(:string)
    field :role, non_null(:string)
    field :name, non_null(:string)
    field :position, non_null(:string)
  end

  object :logout_response do
    field :message, :string
  end

  object :delete_success_response do
    field :message, :string
  end

  object :count do
    field :count, non_null(:integer)
  end
end
