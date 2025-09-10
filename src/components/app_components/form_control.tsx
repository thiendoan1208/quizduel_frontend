"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function FormControl() {
  return (
    <div className="z-20 space-y-2 max-w-[500px] px-3 md:px-0">
      <div className="space-y-1 flex flex-col items-center">
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-wide text-white">
          Welcome
          <span
            className="animate-blink-neon ml-2 text-(--neon-green) font-bold"
            style={{
              fontFamily: "var(--font-exo2), sans-serif",
            }}
          >
            Player
          </span>
          {/* Change theo tài khoản */}
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
            type="text"
            placeholder="Tạo username của riêng bạn..."
            className="border-2 focus-visible:border-2 focus-visible:border-green-700 backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white  border-white/10 rounded-full py-6 px-4 transition-colors"
          ></Input>
          <button className="cursor-pointer absolute right-1.5 top-[8px] text-green-500 w-9 h-9 flex items-start justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden">
            <span className="relative w-full h-full block overflow-hidden -translate-y-[2px]">
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                →
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                →
              </span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-1">
          <Checkbox
            id="account"
            className="border-green-600 rounded-full border-2 size-5 data-[state=checked]:text-green-500"
          />
          <Label htmlFor="account" className="text-green-500 font-bold">
            Lưu tài khoản.
          </Label>
        </div>
      </div>

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

export default FormControl;
