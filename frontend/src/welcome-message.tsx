import { useUser } from "./hooks/store";

const WelcomeMessage = () => {
  const user = useUser();

  return (
    <div className="text-center text-lg font-bold">Hello {user?.name || "guess"}!</div>
  );
};

export default WelcomeMessage;
