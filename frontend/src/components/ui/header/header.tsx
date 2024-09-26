import LogoutButton from "../../../features/auth/components/logout-button";
import { useAppSelector } from "../../../hooks/store";
import CurrentTime from "../current-time";
import Logo from "../logo";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="container mx-auto px-4 bg-slate-50 w-full rounded-b-md border border-slate-300">
      <div className="flex flex-wrap items-center justify-between">
        <div className="py-2">
          <Logo />
        </div>
        <div className="flex flex-wrap items-center text-slate-700">
          {!!user && <LogoutButton className="mr-4" />}
          <CurrentTime />
        </div>
      </div>
    </header>
  );
};

export default Header;
