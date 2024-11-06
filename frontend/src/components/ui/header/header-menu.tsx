import { Link } from "react-router-dom";
import { useUser } from "@/hooks/store";
import { isAdminUser } from "@/utils/user";

const HeaderMenu = () => {
  const user = useUser();

  return (
    <ul>
      {isAdminUser(user) && (
        <>
          <li>
            <Link
              className="font-semibold px-2 py-2 rounded hover:bg-slate-100"
              to="/admin"
            >
              Dashboard
            </Link>
            <Link
              className="font-semibold px-2 py-2 rounded hover:bg-slate-100"
              to="/admin/users"
            >
              Users
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default HeaderMenu;
