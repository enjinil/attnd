defmodule AttendanceApiWeb.GraphQl.Schema.ContentTypes do
  use Absinthe.Schema.Notation

  input_object :login_input do
    field :email, :string
    field :password, :string
  end

  object :hello_world do
    field :message, :string
  end

  object :user_token do
    field :token, :string
    field :email, :string
  end

  object :logout_response do
    field :message, :string
  end
end
