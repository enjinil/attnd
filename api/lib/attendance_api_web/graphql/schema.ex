defmodule AttendanceApiWeb.GraphQl.Schema do
  use Absinthe.Schema
  import_types AttendanceApiWeb.Schema.ContentTypes

  query do
    @desc "Hello world!"
    field :hello_world, :hello_world do
      resolve fn _a, _b -> {:ok, %{message: "Hello World!"}} end
    end
  end

  # mutation do
  # end

  # subscription do
  # end
end
