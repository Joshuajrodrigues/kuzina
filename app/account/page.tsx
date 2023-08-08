import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../types/supabase'
import AccountForm from './AccountForm'
export const dynamic = 'force-dynamic'
export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AccountForm session={session} />
}


// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { supaClient } from "@/lib/utils";
// import { Session } from "@supabase/supabase-js";
// import { revalidatePath } from "next/cache";
// import Link from "next/link";

// const UserAccount = async ({ session }: { session: Session | null }) => {
// //   const {
// //     data: { session },
// //   } = await supaClient().auth.getSession();
  
//   const user = session?.user;

//   const {
//     data,
//   } = await supaClient()
//     .from("profiles")
//     .select(`full_name, username`)
//     .eq("id", user?.id)
//     .single();



//   const updateUserAccount = async (formData: FormData) => {
//     "use server";
//     try {
//       let { error } = await supaClient()
//         .from("profiles")
//         .upsert({
//           id: user?.id as string,
//           full_name: formData.get("full_name"),
//           username: formData.get("username"),
//           updated_at: new Date().toISOString(),
//         });
//       if (error) throw error;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       revalidatePath("/account");
//     }
//   };
  
//   return (
//     <>
//       <form action={updateUserAccount} className="p-5 m-5">
//         <div className="py-5">
//           <label htmlFor="email">Email</label>
//           <Input
//             name="email"
//             id="email"
//             type="text"
//             defaultValue={session?.user.email}
//             disabled
//           />
//         </div>
//         <div className="py-5">
//           <label htmlFor="fullName">Name</label>
//           <Input
//             name="full_name"
//             id="fullName"
//             type="text"
//             defaultValue={data?.full_name || ""}
//           />
//         </div>
//         <div className="py-5">
//           <label htmlFor="username">Nick name</label>
//           <Input
//             name="username"
//             id="username"
//             type="text"
//             defaultValue={data?.username || ""}
//           />
//         </div>
//         <div className="py-5 flex justify-between items-center">
//           <Link href={'/'}  className="my-5">
//             Back
//           </Link>
//           <Button className="button primary block" type="submit">
//             Update
//           </Button>
//         </div>
//       </form>
//       {JSON.stringify(data,null,2)}
//     </>
//   );
// };

// export default UserAccount;
