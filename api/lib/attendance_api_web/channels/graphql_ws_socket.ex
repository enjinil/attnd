defmodule AttendanceApiWeb.GraphqlWSSocket do
  use Absinthe.GraphqlWS.Socket, schema: AttendanceApiWeb.GraphQl.Schema

  def connect(_, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
