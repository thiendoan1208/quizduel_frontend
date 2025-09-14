"use client";

import { HashLoader } from "react-spinners";
import CreateUserForm from "@/components/app_components/form/create";
import { BackGround } from "@/components/nurui/background";
import { getUser } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, Copy, X } from "lucide-react";
import UserMainForm from "@/components/app_components/form/main";
import toast from "react-hot-toast";

export default function Home() {
  const { login } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const { data: user, isPending: gettingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();

      const popup = localStorage.getItem("popup");
      if (popup === "false") {
        setIsModalOpen(false);
      }

      login(response.data[0]);
      return response;
    },
    retry: false,
    staleTime: 5 * 60 * 60,
  });

  return (
    <div>
      <BackGround>
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

          <div
            className={`${
              user && user?.success && isModalOpen && !gettingUserInfo
                ? "fixed"
                : "hidden"
            } top-1/2 w-[500px] z-20`}
          >
            <Alert className="bg-black border-green-500 border">
              <AlertTitle className="text-green-500 text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon
                    className="size-5"
                    style={{
                      color: "green",
                    }}
                  />
                  Tạo tài khoản thành công.
                </div>

                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                    localStorage.setItem("popup", "false");
                  }}
                />
              </AlertTitle>
              <AlertDescription className="text-[16px] text-white/70">
                Đây là mã đăng nhập của bạn, từ lần đăng nhập sau hãy nhập mã
                này cùng với username của bạn:
                <span className="text-red-500">
                  Mã chỉ xuất hiện 1 lần duy nhất.
                </span>
                <span className="w-full text-white flex justify-center items-center">
                  {user && user.success && user.data[0].loginSecret}
                  <Copy
                    onClick={() => {
                      navigator.clipboard.writeText(user!.data[0].loginSecret);
                      toast.success("Copied");
                    }}
                    className="ml-4 size-5 cursor-pointer"
                  />
                </span>
              </AlertDescription>
            </Alert>
          </div>
        </>
      </BackGround>
    </div>
  );
}

/**
 
 * reload trang lưu/ k lưu thì xóa user trong db và xóa token luôn + chuyển hướng về page

 */
