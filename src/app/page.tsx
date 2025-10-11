"use client";

import { HashLoader } from "react-spinners";
import CreateUserForm from "@/components/app_components/form/create";
import { BackGround } from "@/components/nurui/background";
import { getUser } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/context/user";
import UserMainForm from "@/components/app_components/form/main";
import Header from "@/components/app_components/header";

export default function Home() {
  const { login } = useContext(UserContext);

  const { data: user, isPending: gettingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();

      login(response.data[0]);
      return response;
    },
    retry: false,
    staleTime: 5 * 60 * 60,
  });

  return (
    <BackGround>
      <>
        <div className="z-20 fixed w-full top-0">
          <Header loginSecret={user && user?.data[0].loginSecret} place="main" />
        </div>
        <>
          {gettingUserInfo ? (
            <div>
              <HashLoader color="green" />
            </div>
          ) : (
            <>
              {user && user.success && user.data ? (
                <UserMainForm user={user.data[0]} />
              ) : (
                <CreateUserForm />
              )}
            </>
          )}
        </>
      </>
    </BackGround>
  );
}
