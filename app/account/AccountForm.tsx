"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clientSupabase } from "@/lib/constants";
import {
  Session
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
export const revalidate = 0;

export default function AccountForm({ session }: { session: Session | null }) {

  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const router = useRouter()

  const getProfile = useCallback(async () => {

    try {

      setLoading(true);
      let { data, error, status } = await clientSupabase
        .from("profiles")
        .select(`full_name, username`)
        .eq("id", user?.id!)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false);

    }

  }, [user, clientSupabase]);

  async function updateProfile({
    username,
    fullname
  }: {
    username: string | null;
    fullname: string | null;
    
  }) {
    try {
      setLoading(true);

      let { error } = await clientSupabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);
 

  

  return (
    <div className="p-5 m-5">
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Nickname</label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <section className="py-5 flex justify-between">
        <div>
          <form action="api/auth/signout" method="post">
            <Button variant={"destructive"} className="button block" type="submit">
              Sign out
            </Button>
          </form>
        </div>
        <div className="flex flex-col">
          <Button
            className="button primary block"
            onClick={() => updateProfile({ fullname, username })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
          <Button
          variant={"link"}
          className="my-5"
           onClick={()=>router.back()}
          >
            Back
          </Button>
        </div>

      </section>
    </div>
  );
}
