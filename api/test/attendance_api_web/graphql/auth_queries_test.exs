defmodule AttendanceApiWeb.GraphQl.AuthQueriesTest do
  use AttendanceApiWeb.GraphQlCase

  alias AttendanceApi.AccountsFixtures

  @login_mutation """
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      email
    }
  }
  """

  @logout_mutation """
  mutation Logout {
    logout {
      message
    }
  }
  """

  @hello_world_query """
  query {
    helloWorld {
      message
    }
  }
  """

  describe "[query] helloWorld" do
    test "returns hello message for guest" do
      assert %{
               "data" => %{
                 "helloWorld" => %{
                   "message" => "Hello guess!"
                 }
               }
             } = gql_post(%{
              query: @hello_world_query
             })
    end

    test "returns personalized hello message for authenticated user" do
      user = AccountsFixtures.user_fixture()
      token = AttendanceApi.Accounts.create_user_api_token(user)

      assert %{
               "data" => %{
                 "helloWorld" => %{
                   "message" => message
                 }
               }
             } = gql_post(%{
              query: @hello_world_query,
              token: token
             })

      assert String.contains?(message, user.email)
    end
  end

  describe "[mutation] login" do
    test "logs in user with valid credentials" do
      password = "a_valid_password_123456"
      user = AccountsFixtures.user_fixture(%{password: password})

      variables = %{
        "input" => %{
          "email" => user.email,
          "password" => password
        }
      }

      assert %{
               "data" => %{
                 "login" => %{
                   "token" => _token,
                   "email" => email
                 }
               }
             } =
               gql_post(%{
                 query: @login_mutation,
                 variables: variables
               })

      assert user.email == email
    end

    test "fails to log in with invalid credentials" do
      password = "invalid_password"
      user = AccountsFixtures.user_fixture(%{password: "a_valid_password_123456"})

      variables = %{
        "input" => %{
          "email" => user.email,
          "password" => password
        }
      }

      assert %{
               "data" => %{"login" => nil},
               "errors" => [
                 %{
                   "message" => "Invalid credentials"
                 }
               ]
             } =
               gql_post(%{
                 query: @login_mutation,
                 variables: variables
               })
    end

  end

  describe "[mutation] logout" do
    test "logs out authenticated user" do
      user = AccountsFixtures.user_fixture()
      token = AttendanceApi.Accounts.create_user_api_token(user)

      assert %{
               "data" => %{
                 "logout" => %{
                   "message" => "Logged out successfully"
                 }
               }
             } = gql_post(%{
              query: @logout_mutation,
              token: token
            })
    end

    test "fails to logout unauthenticated user" do
      assert %{
        "data" => %{"logout" => nil},
        "errors" => [
          %{
            "message" => "No valid token found"
          }
        ]
      } = gql_post(%{
       query: @logout_mutation,
     })
    end
  end

end
