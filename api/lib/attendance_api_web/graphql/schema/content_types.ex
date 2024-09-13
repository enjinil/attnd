defmodule AttendanceApiWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation

  object :hello_world do
    field :message, :string
  end
end
