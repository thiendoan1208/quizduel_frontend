import { ArrowUpRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="flex text-white justify-between p-4">
      <Link href={"#"} className="flex items-center">
        <Image
          src="/image/logo.png"
          width={100}
          height={100}
          alt="QuizDuel Logo"
          className="size-14 select-none cursor-pointer"
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

        <Link href={"#"}>
          <Info className="text-green-500/80" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
