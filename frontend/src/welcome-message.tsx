import { useQuery } from "react-query";
import config from "./config";

const WelcomeMessage = () => {
  const query = useQuery({
    queryKey: ["welcome-message"],
    queryFn: () =>
      fetch(config.GRAPHQL_API_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"query":"{helloWorld{message}}"}',
      }).then(res => res.json()),
  });

  return (
    <div className="text-lg font-bold">
      {query.isLoading && "Loading.."}
      {query.isSuccess && query.data.data.helloWorld.message}
    </div>
  );
};

export default WelcomeMessage;
