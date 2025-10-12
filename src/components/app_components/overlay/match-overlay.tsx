"use client";

import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";

export default function MatchOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.1)_0%,rgba(0,10,0,0.95)_80%)] backdrop-blur-md">
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-green-500/10 blur-3xl"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-green-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HashLoader className="size-12 mb-4" color="green" />
        <p className="text-lg font-semibold tracking-wide text-green-300 animate-pulse">
          Đang khởi tạo câu hỏi...
        </p>
        <p className="text-sm text-green-500 mt-2">
          Vui lòng chờ trong giây lát.
        </p>
      </motion.div>
    </div>
  );
}
