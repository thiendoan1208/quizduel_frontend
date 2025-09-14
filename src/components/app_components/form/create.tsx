"use client";

import { Input } from "@/components/ui/input";
import { createUser } from "@/service/user";
import { createUserResponse } from "@/type/response-type";
import { userCreateForm } from "@/type/user-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleX, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateUserForm() {
  const [userError, setUserError] = useState<boolean>(false);
  const [userCreateForm, setUserInfo] = useState<userCreateForm>({
    name: "",
    win: 0,
    loss: 0,
  });

  const { mutate: createUserMutate, isPending: creatingUser } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (userCreateForm: userCreateForm) => {
      return createUser(userCreateForm);
    },
    onError: (data: AxiosError<createUserResponse>) => {
      if (data.response) {
        toast.error(data.response.data.message);
      } else {
        toast.error(data.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("popup", "true");
      window.location.reload();
    },
  });

  const isValidate = () => {
    const userNameRegex =
      /^(?=.{5,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    if (!userNameRegex.test(userCreateForm.name)) {
      setUserError(true);
      return false;
    } else {
      setUserError(false);
      return true;
    }
  };

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
          Tạo tài khoản đơn giản, chỉ cần username.
        </p>
        <p className="text-[0.9rem] md:text-[1rem] text-white/70 font-light">
          Click hướng dẫn nếu bạn không hiểu chuyện gì đang xảy ra.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const isvalid = isValidate();
                if (isvalid && !userError) {
                  localStorage.removeItem("popup");
                  createUserMutate(userCreateForm);
                }
              }
            }}
            value={userCreateForm.name}
            onChange={(e) => {
              setUserInfo({ ...userCreateForm, name: e.target.value.trim() });
            }}
            type="text"
            placeholder="Tạo username của riêng bạn..."
            className="border-2 focus-visible:border-2 focus-visible:border-green-700 backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white  border-white/10 rounded-full py-6 px-4 transition-colors"
          ></Input>
          <button
            onClick={() => {
              const isvalid = isValidate();
              if (isvalid && !userError) {
                createUserMutate(userCreateForm);
              }
            }}
            className={` ${
              creatingUser ? "pointer-events-none" : ""
            } cursor-pointer absolute right-1.5 top-[8px] text-green-500 w-9 h-9 flex items-start justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden`}
          >
            {creatingUser ? (
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
          <div
            className={`text-red-500 space-y-1 ml-1 ${!userError && "hidden"}`}
          >
            <h1 className="text-lg">Username phải thỏa mãn các yêu cầu sau:</h1>
            <ul className="ml-2 space-y-1">
              <li className="flex gap-1">
                <CircleX /> Độ dài trong khoảng 5-15 kí tự.
              </li>
              <li className="flex gap-1">
                <CircleX /> Không có khoảng trắng.
              </li>
              <li className="flex gap-1">
                <CircleX /> Chỉ bao gồm {`[a-z] [A-Z] [0-9]`}.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span className="text-md md:text-[16px] text-white/40">
        Đã có tài khoản ?{" "}
        <Link
          href="/login"
          className="underline text-green-500/40 hover:text-green-500 transition-colors"
        >
          Đăng nhập.
        </Link>
      </span>
      <div className="flex items-center gap-4">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-white/40 text-sm">more</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <div>
        <p className="text-md md:text-xs text-white/40">
          Bằng việc tạo tài khoản, bạn xác nhận rằng mình đã đọc, hiểu và đồng ý
          tuân thủ tất cả các quy tắc, luật lệ, lưu ý, trách nhiệm cũng như
          thông tin được đưa ra.{" "}
          <Link
            href="/docs"
            className="underline text-green-500/40 hover:text-green-500 transition-colors"
          >
            Điều khoản dịch vụ
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateUserForm;
