import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth-provider";

const LogoutButton = ({ className }: { className?: string }) => {
  return (
    <Button variant="outline" onClick={() => logout()} className={className}>
      Logout
    </Button>
  );
};

export default LogoutButton;
