"use client";

import { Input } from "@/components/ui/input";
import { loginUser } from "@/service/user";
import { userResponse } from "@/type/response-type";
import { userLoginForm } from "@/type/user-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<userLoginForm>({
    name: "",
    loginSecret: "",
  });

  const { mutate: loginUserMutate, isPending: loggingUser } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (userInfo: userLoginForm) => {
      return loginUser(userInfo);
    },
    onError: (data: AxiosError<userResponse>) => {
      if (data.response) {
        toast.error(data.response.data.message);
      } else {
        toast.error(data.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("popup", "false");
      router.push("/");
    },
  });

  return (
    <div className="z-20 space-y-2 max-w-[500px] px-3 md:px-0">
      <div className="space-y-1 flex flex-col items-center">
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-wide text-white">
          Welcome
          <span
            className="animate-blink-neon ml-2 font-bold text-neon"
            style={{
              fontFamily: "var(--font-exo2), sans-serif",
            }}
          >
            Player
          </span>
        </h1>
        <p className="text-[1.2rem] md:text-[1.6rem] text-white/70 font-light">
          Đăng nhập.
        </p>
        <p className="text-[0.9rem] md:text-[1rem] text-white/70 font-light">
          Click hướng dẫn nếu bạn không hiểu chuyện gì đang xảy ra.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="space-y-2">
            <Input
              value={userInfo.name}
              onChange={(e) => {
                setUserInfo({ ...userInfo, name: e.target.value.trim() });
              }}
              type="text"
              placeholder="Username..."
              className="border-2 focus-visible:border-2 focus-visible:border-green-700 backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white  border-white/10 rounded-full py-6 px-4 transition-colors"
            ></Input>

            <div className="relative">
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loginUserMutate(userInfo);
                  }
                }}
                value={userInfo.loginSecret}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    loginSecret: e.target.value.trim(),
                  });
                }}
                type="text"
                placeholder="Mã xác minh được cấp sau khi tạo tài khoản..."
                className="border-2 focus-visible:border-2 focus-visible:border-green-700 backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white  border-white/10 rounded-full py-6 px-4 transition-colors"
              ></Input>

              <button
                onClick={() => {
                  loginUserMutate(userInfo);
                }}
                className={` ${
                  loggingUser ? "pointer-events-none" : ""
                } cursor-pointer absolute right-1.5 top-[8px] text-green-500 w-9 h-9 flex items-start justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden`}
              >
                {loggingUser ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : (
                  <>
                    <span className="relative w-full h-full block overflow-hidden -translate-y-[2px]">
                      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                        →
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                        →
                      </span>
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-white/40 text-sm">more</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <span className="text-md md:text-[16px] text-white/40">
        Chưa có tài khoản ?{" "}
        <Link
          href="/"
          className="underline text-green-500/40 hover:text-green-500 transition-colors"
        >
          Đăng ký.
        </Link>
      </span>
    </div>
  );
}

export default LoginForm;
