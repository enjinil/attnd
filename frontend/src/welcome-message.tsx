import { useQuery } from "react-query";
import { gql } from "./graphql";
import { gqlRequest } from "./lib/graphql-client";

const HELLO_WORLD = gql(`
  query HelloWorld {
    helloWorld {
      message
    }
  }
`);

const WelcomeMessage = () => {
  const {isLoading, isSuccess, data} = useQuery({
    queryFn: () => gqlRequest(HELLO_WORLD),
  });

  return (
    <div className="text-center text-lg font-bold">
      {isLoading && "Loading.."}
      {isSuccess && data.data.helloWorld?.message}
    </div>
  );
};

export default WelcomeMessage;
