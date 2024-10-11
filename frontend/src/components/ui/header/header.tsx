import LogoutButton from "../../../features/auth/components/logout-button";
import { useUser } from "../../../hooks/store";
import { isAdminUser } from "../../../utils/user";
import CurrentTime from "../current-time";
import Logo from "../logo";
import HeaderMenu from "./header-menu";

const Header = () => {
  const user = useUser();

  return (
    <header className="container mx-auto px-4 bg-slate-50 w-full rounded-b-md border border-slate-300">
      <div className="flex flex-wrap text-sm items-center justify-between">
        <div className="flex items-center py-2">
          <Logo className="mr-6" />
          <HeaderMenu />
        </div>
        <div></div>
        <div className="flex flex-wrap lg:space-x-4 items-center text-slate-700">
          {!!user && <LogoutButton />}
          {isAdminUser(user) ? null : <CurrentTime />}
        </div>
      </div>
    </header>
  );
};

export default Header;
