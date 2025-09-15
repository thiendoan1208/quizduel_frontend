"use client";

import { Copy } from "lucide-react";
import { ArrowUpRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteUser, logoutUser } from "@/service/user";
import { userResponse } from "@/type/response-type";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user";

function Header({ loginSecret }: { loginSecret: string | undefined }) {
  const { user } = useContext(UserContext);

  const [isSecretModal, setisSecretModal] = useState<boolean>(false);
  const [isLogoutModal, setisLogoutModal] = useState<boolean>(false);
  const [isDeleteModal, setisDeleteModal] = useState<boolean>(false);

  const { mutate: logoutUserMutate } = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: () => {
      return logoutUser();
    },
    onError: (data: AxiosError<userResponse>) => {
      if (data.response) {
        toast.error(data.response.data.message);
      } else {
        toast.error(data.message);
      }
    },
    onSuccess: () => {
      localStorage.setItem("popup", "false");
      window.location.reload();
    },
  });

  const { mutate: deleteUserMutate } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: () => {
      return deleteUser(user.name);
    },
    onError: (data: AxiosError<userResponse>) => {
      if (data.response) {
        toast.error(data.response.data.message);
      } else {
        toast.error(data.message);
      }
    },
    onSuccess: () => {
      localStorage.setItem("popup", "false");
      window.location.reload();
    },
  });

  return (
    <div className="flex text-white justify-between p-4">
      <Link href={"#"} className="flex items-center">
        <Image
          src="/image/logo.png"
          width={100}
          height={100}
          alt="QuizDuel Logo"
          className="size-14 select-none cursor-pointer"
          priority
        />
        <span
          className="ml-2 text-2xl text-green-500 select-none cursor-pointer"
          style={{
            fontFamily: "var(--font-vt323)",
          }}
        >
          QuizDuel
        </span>
      </Link>

      <div className="flex items-center">
        <div className="pr-4 group">
          <Link
            href="#"
            className="text-lg font-semibold text-green-500/80 flex items-center"
          >
            Hướng dẫn
            <ArrowUpRight className="translate-y-[.5px]" />
          </Link>

          <div className="relative h-[2px] w-full overflow-hidden group">
            {/* Các đoạn nhỏ */}
            <span className="absolute left-0 top-0 h-full w-1/6 bg-green-500/50 opacity-0 group-hover:animate-[var(--animate-frag-delay1)]"></span>
            <span className="absolute left-1/4 top-0 h-full w-1/6 bg-green-500/50 opacity-0 group-hover:animate-[var(--animate-frag-delay2)]"></span>
            <span className="absolute left-2/4 top-0 h-full w-1/6 bg-green-500/50 opacity-0 group-hover:animate-[var(--animate-frag-delay3)]"></span>
            <span className="absolute left-3/4 top-0 h-full w-1/6 bg-green-500/50 opacity-0 group-hover:animate-[var(--animate-frag-delay4)]"></span>

            {/* Line cuối cùng */}
            <span className="absolute left-0 top-0 h-full w-[95%] origin-left opacity-0 bg-green-500/50 group-hover:animate-[var(--animate-finalLine)]"></span>
          </div>
        </div>

        <div className={`${loginSecret ? "block" : "hidden"}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Info className="text-green-500/80 cursor-pointer size-7" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-black text-white border-green-500 -translate-x-3"
              align="start"
            >
              <DropdownMenuLabel>Quản Lý</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setisSecretModal(true);
                }}
                className="text-green-500 font-bold mt-1 cursor-pointer"
              >
                <h1>Mã đăng nhập</h1>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setisDeleteModal(true);
                }}
                className="text-red-500 font-bold mt-1 cursor-pointer"
              >
                <h1>Xóa tài khoản</h1>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setisLogoutModal(true);
                }}
                className="text-red-500 font-bold mt-1 cursor-pointer"
              >
                <h1>Đăng xuất</h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isSecretModal}>
            <AlertDialogContent className="bg-black border-green-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-green-500">
                  Mã đăng nhập
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[16px] text-white/70">
                  Đây là mã đăng nhập của bạn.
                  <span className="w-full text-white flex justify-center items-center">
                    {loginSecret}
                    <Copy
                      onClick={() => {
                        if (loginSecret) {
                          navigator.clipboard.writeText(loginSecret);
                        }
                        toast.success("Copied");
                      }}
                      className="ml-4 size-5 cursor-pointer"
                    />
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-green-500 cursor-pointer"
                  onClick={() => {
                    setisSecretModal(false);
                  }}
                >
                  Tiếp tục
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={isLogoutModal}>
            <AlertDialogTrigger asChild></AlertDialogTrigger>
            <AlertDialogContent className="bg-black border-green-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500">
                  Đăng xuất?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  Không thể hoàn tác hành động này.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setisLogoutModal(false);
                  }}
                >
                  Quay lại
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 cursor-pointer"
                  onClick={() => {
                    setisLogoutModal(false);
                    logoutUserMutate();
                  }}
                >
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={isDeleteModal}>
            <AlertDialogTrigger asChild></AlertDialogTrigger>
            <AlertDialogContent className="bg-black border-green-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500">
                  Xóa tài khoản ?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  Không thể hoàn tác hành động này.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setisDeleteModal(false);
                  }}
                >
                  Quay lại
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 cursor-pointer"
                  onClick={() => {
                    setisDeleteModal(false);
                    deleteUserMutate();
                  }}
                >
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default Header;
