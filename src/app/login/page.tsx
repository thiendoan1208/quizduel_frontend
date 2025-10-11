"use client";

import { BackGround } from "@/components/nurui/background";
import LoginForm from "@/components/app_components/form/login";
import Header from "@/components/app_components/header";

export default function Home() {
  return (
    <div>
      <BackGround>
        <>
          <div className="z-20 fixed w-full top-0">
            <Header loginSecret={""} place="" />
          </div>
          <LoginForm />
        </>
      </BackGround>
    </div>
  );
}
