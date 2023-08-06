import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { Session } from "@supabase/auth-helpers-nextjs";

const UserProfileMenu = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  if (!user) {
    return <></>;
  }
  return (
    <form action={`${BASE_URL}/api/auth/signout`} method="post">
      <Button className="button block" type="submit">
        Sign out
      </Button>
    </form>
  );
};

export default UserProfileMenu;
