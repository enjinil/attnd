defmodule AttendanceApiWeb.GraphQl.Schema.AccountsTypes do
  use Absinthe.Schema.Notation

  enum :role do
    value :employee
    value :customer
  end

  object :account do
    field :id, non_null(:string)
    field :email, non_null(:string)
    field :role, non_null(:string)
    field :name, non_null(:string)
    field :position, non_null(:string)
    field :is_active, non_null(:boolean)
  end

  input_object :account_input do
    field :email, non_null(:string)
    field :role, non_null(:string)
    field :name, non_null(:string)
    field :position, non_null(:string)
    field :is_active, non_null(:boolean)
    field :password, :string
  end
end
