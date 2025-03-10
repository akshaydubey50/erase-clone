"use client";

import {
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { KindeUser } from "@/types";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

export default function Home() {
  const { user } = useKindeBrowserClient() as { user: KindeUser };

  const createUser = useMutation(api.user.creatUser);
  const convex = useConvex();

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email??"" });
    console.log("result:", result);
    if (!result) {
      createUser({
        name: user?.given_name || "",
        email: user?.email || "",
        image: user?.picture || "",
      })
        .then((res) => console.log("User Created:", res))
        .catch((err) => console.error("Error creating user:", err));
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <>
       <div className='p-8'>
      <Header/>
      <FileList/>
      {/* <AdBanner
          data-ad-slot="4796371341"
          data-ad-format="auto"
          data-full-width-responsive="true"
        /> */}
    </div>
    </>
  );
}
