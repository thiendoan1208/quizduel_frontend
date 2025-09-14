"use client";

import { BackGround } from "@/components/nurui/background";
import LoginForm from "@/components/app_components/form/login";

export default function Home() {
  return (
    <div>
      <BackGround>
        <LoginForm />
      </BackGround>
    </div>
  );
}
