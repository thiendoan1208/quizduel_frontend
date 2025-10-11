"use client";

import Header from "@/components/app_components/header";
import { Card } from "@/components/ui/card";
import { UserContext } from "@/context/user";
import { getUser } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { User, MessageCircle } from "lucide-react";
import { useContext, useState } from "react";

export default function QuizBackground() {
  const { login } = useContext(UserContext);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      login(response.data[0]);
      return response;
    },
    retry: false,
    staleTime: 5 * 60 * 60,
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0d0d1a] overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header loginSecret={user && user?.data[0].loginSecret} place="match" />
      </div>

      {/* Background animation */}
      <div className="absolute inset-0 animate-fade-glow bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.12)_0%,rgba(0,2,0,1)_70%)]" />

      {/* Main content */}
      <div className="flex gap-10 relative z-10 mt-20">
        {/* Quiz box */}
        <div className="flex flex-col items-center mx-2">
          <Card className="w-full lg:w-[600px] bg-black/60 backdrop-blur-md border border-green-500/60 py-8 px-8 text-white rounded-2xl transition-all duration-300">
            {/* Quiz info */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-start text-sm text-green-300 space-y-1">
                <span>
                  <span className="font-semibold text-red-400 text-[1rem]">
                    Độ khó:
                  </span>{" "}
                  Trung bình
                </span>
                <span>
                  <span className="font-semibold text-green-400 text-[1rem]">
                    Chủ đề:
                  </span>{" "}
                  Toán, lý, hóa
                </span>
              </div>

              {/* Timer */}
              <div className="size-12 border-2 rounded-full border-green-500 flex items-center justify-center text-green-300 font-bold text-lg shadow-[0_0_15px_rgba(0,255,150,0.6)]">
                <span>30</span>
              </div>
            </div>

            {/* Main quiz */}
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-lg font-semibold text-green-200">
                <span className="text-green-400 flex flex-nowrap">
                  Câu <span className="ml-1">1:</span>
                </span>
                <p className="text-start">
                  Tỉnh thành nào ở Việt Nam có nhiều hồ nhất?
                </p>
              </div>

              <div className="flex flex-col items-start gap-3">
                {["Hà Nội", "Lâm Đồng", "Thái Nguyên", "Hải Phòng"].map(
                  (ans, i) => (
                    <button
                      key={i}
                      className="cursor-pointer w-full text-left px-4 py-2 rounded-lg border border-green-600 text-green-100 hover:bg-green-600/20 transition-all duration-200 hover:shadow-[0_0_5px_rgba(0,255,150,0.6)]"
                    >
                      <span className="font-bold text-green-400">
                        {String.fromCharCode(65 + i)}:
                      </span>{" "}
                      {ans}
                    </button>
                  )
                )}
              </div>
            </div>
          </Card>

          {/* User info */}
          <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 justify-between mt-4">
            <div className="flex-1 md:col-span-1 bg-black/50 border border-green-600/60 rounded-xl text-left text-green-300 p-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,150,0.3)]">
              <p>
                <span className="font-semibold text-green-400">Username:</span>{" "}
                {user?.data[0]?.name || "Đang tải..."}
              </p>
              <p>
                <span className="font-semibold text-green-400">
                  Thắng / Thua:
                </span>{" "}
                <span className="text-green-500 font-bold">
                  {user?.data[0]?.win ?? 0}
                </span>{" "}
                /{" "}
                <span className="text-red-400 font-bold">
                  {user?.data[0]?.loss ?? 0}
                </span>
              </p>
            </div>
            <div className="flex-1 md:col-span-1 bg-black/50 border border-green-600/60 rounded-xl text-left text-green-300 p-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,150,0.3)]">
              <p className="flex items-center">
                <span className="font-semibold text-green-400">Username:</span>{" "}
                aaaaaaaaaaaaaaa
                <User className="size-5 text-yellow-500 ml-2" />
              </p>
              <p>
                <span className="font-semibold text-green-400">
                  Thắng / Thua:
                </span>{" "}
                <span className="text-green-500 font-bold">
                  {user?.data[0]?.win ?? 0}
                </span>{" "}
                /{" "}
                <span className="text-red-400 font-bold">
                  {user?.data[0]?.loss ?? 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat box (desktop) */}
        <div className="hidden lg:flex flex-col justify-between w-[300px] min-h-[500px] bg-black/60 backdrop-blur-md border border-green-500/60 rounded-2xl p-4 text-green-100 shadow-[0_0_20px_rgba(0,255,150,0.3)]">
          <div className="text-center text-green-400 font-semibold border-b border-green-500 pb-2">
            Trò chuyện
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-3 scrollbar-thin scrollbar-thumb-green-600/40 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <p className="text-center text-green-300/70 mt-10">
                Chưa có tin nhắn nào
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-green-600/10 px-3 py-2 rounded-lg border border-green-600/40 text-sm"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          <div className="flex mt-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 rounded-l-lg bg-black/40 border border-green-600/50 text-green-100 outline-none placeholder-green-500/50 focus:border-green-400"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-green-600/30 border border-green-500/60 rounded-r-lg text-green-200 hover:bg-green-600/50 transition-all duration-200"
            >
              Gửi
            </button>
          </div>
        </div>

        {/* ✅ Chat icon cho mobile */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-5 right-5 lg:hidden bg-green-600/40 hover:bg-green-600/60 border border-green-500 text-green-100 rounded-full p-3 shadow-[0_0_10px_rgba(0,255,150,0.6)] transition-all duration-200"
        >
          <MessageCircle className="size-6" />
        </button>

        {/* ✅ Popup chat khi bấm icon */}
        {isChatOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 lg:hidden">
            <div className="w-[90%] max-w-[350px] bg-black/80 backdrop-blur-md border border-green-500/60 rounded-2xl p-4 text-green-100 shadow-[0_0_20px_rgba(0,255,150,0.4)] relative">
              <button
                onClick={() => setIsChatOpen(false)}
                className="absolute top-2 right-3 text-green-400 hover:text-green-200 text-lg"
              >
                ✕
              </button>

              <div className="text-center text-green-400 font-semibold border-b border-green-500 pb-2">
                Trò chuyện
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 mt-3 max-h-[300px] scrollbar-thin scrollbar-thumb-green-600/40 scrollbar-track-transparent">
                {messages.length === 0 ? (
                  <p className="text-center text-green-300/70 mt-10">
                    Chưa có tin nhắn nào
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className="bg-green-600/10 px-3 py-2 rounded-lg border border-green-600/40 text-sm"
                    >
                      {msg}
                    </div>
                  ))
                )}
              </div>

              <div className="flex mt-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 rounded-l-lg bg-black/40 border border-green-600/50 text-green-100 outline-none placeholder-green-500/50 focus:border-green-400"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-green-600/30 border border-green-500/60 rounded-r-lg text-green-200 hover:bg-green-600/50 transition-all duration-200"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
