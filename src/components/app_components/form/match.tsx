import MatchOverlay from "@/components/app_components/overlay/match-overlay";
import { Card } from "@/components/ui/card";
import { EachQues, MatchInfo } from "@/type/game-type";
import { MainUser } from "@/type/user-type";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const TOTAL_QUES = 4;
const TOTAL_TIME = 40;

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  withCredentials: true,
});

function MatchForm({
  user,
  matchID,
  matchInfo,
}: {
  user: MainUser;
  matchID: string;
  matchInfo: MatchInfo;
}) {
  const timerRef = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );
  const emittedRef = useRef(false);

  //
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  //

  const [countdown, setCountDown] = useState(TOTAL_TIME);
  const [question, setQuestion] = useState<EachQues | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionStatus, setQuestionStatus] = useState("pending");
  const [isQuesCreated, setIsQuesCreated] = useState(false);

  const modifyUser = () => {
    const userTopic = matchInfo.users.find(
      (u) => user.name === u.userInfo.name
    );

    const userInfo = {
      matchID: matchInfo.matchID,
      topic: userTopic!.topic,
    };

    return userInfo;
  };

  useEffect(() => {
    if (user || matchID) {
      socket.emit("join-match", { matchID });
    }
  }, [matchID, user]);

  useEffect(() => {
    if (!emittedRef.current && questionStatus === "pending") {
      const userMatchInfo = modifyUser();
      if (userMatchInfo) {
        socket.emit("create-ques", { userMatchInfo });
        emittedRef.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchID, user, questionStatus]);

  useEffect(() => {
    if (isQuesCreated) {
      const handleQuestionRes = (data: { eachQues: EachQues }) => {
        setQuestion(data.eachQues);
      };

      socket.on("question-res", handleQuestionRes);
      return () => {
        socket.off("question-res", handleQuestionRes);
      };
    }
  }, [isQuesCreated]);

  useEffect(() => {
    if (questionNumber > TOTAL_QUES) return;

    const checkQuesStatus = (data: { status: string }) => {
      if (data.status === "pending") {
        setIsQuesCreated(false);
        setQuestionStatus(data.status);
      } else if (data.status === "ready") {
        setIsQuesCreated(true);
        setQuestionStatus(data.status);
      }
    };

    socket.on("waiting-for-others", checkQuesStatus);
    socket.on("ques-ready", checkQuesStatus);

    if (isQuesCreated) {
      if (questionNumber === 0) {
        handleNextQuestion();
      }

      timerRef.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            handleNextQuestion();
            return TOTAL_TIME;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }

    return () => {
      socket.off("waiting-for-others", checkQuesStatus);
      socket.off("ques-ready", checkQuesStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber, isQuesCreated]);

  const handleNextQuestion = () => {
    const nextNumber = questionNumber + 1;
    setQuestionNumber(nextNumber);
    socket.emit("get-question", { matchID, question: nextNumber });
  };

  //
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };
  //

  return (
    <>
      {isQuesCreated === false ? (
        <>
          <MatchOverlay />
        </>
      ) : (
        <div className="flex gap-10 relative z-10 mt-20">
          {/* Quiz box */}
          <div className="flex flex-col items-center mx-2">
            <Card className="w-full lg:w-[600px] bg-black/60 backdrop-blur-md border border-green-500/60 py-8 px-8 text-white rounded-2xl transition-all duration-300">
              {/* Quiz info */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start text-sm text-green-300 space-y-1">
                  <span>
                    <span className="font-semibold text-red-400 text-[1rem]">
                      Độ khó:
                    </span>{" "}
                    {question?.data.question.difficulty}
                  </span>
                  <span>
                    <span className="font-semibold text-green-400 text-[1rem]">
                      Chủ đề:
                    </span>{" "}
                    {question?.data.question.topic}
                  </span>
                  <span>
                    <span className="font-semibold text-green-400 text-[1rem]">
                      Đúng / Sai:
                    </span>{" "}
                    0 / <span className="text-red-400">0</span>
                  </span>
                  <span>
                    <span className="font-semibold text-green-400 text-[1rem]">
                      Tổng số câu:
                    </span>{" "}
                    {question?.data.total}
                  </span>
                </div>

                {/* Timer */}
                <div className="size-12 border-2 rounded-full border-green-500 flex items-center justify-center text-green-300 font-bold text-lg shadow-[0_0_15px_rgba(0,255,150,0.6)]">
                  <span>{countdown}</span>
                </div>
              </div>

              {/* Main quiz */}
              <div className="space-y-4">
                <div className="grid grid-cols-9 gap-2 text-lg font-semibold text-green-200">
                  <span className="text-green-400 flex flex-nowrap w-fit">
                    Câu {question?.data.questionNum}:
                  </span>
                  <p className="text-start col-span-8">
                    {question?.data.question.question}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3">
                  {question?.data.question.options.map((ans, i) => (
                    <button
                      key={i}
                      className="cursor-pointer w-full text-left px-4 py-2 rounded-lg border border-green-600 text-green-100 hover:bg-green-600/20 transition-all duration-200 hover:shadow-[0_0_5px_rgba(0,255,150,0.6)]"
                    >
                      <span className="font-bold text-green-400">
                        {String.fromCharCode(65 + i)}:
                      </span>{" "}
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* UserQuery info */}
            <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-2 justify-between mt-4">
              {matchInfo &&
                matchInfo.users.map((user) => (
                  <div
                    key={user.userInfo.name}
                    className="flex-1 md:col-span-1 bg-black/50 border border-green-600/60 rounded-xl text-left text-green-300 p-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,150,0.3)]"
                  >
                    <p>
                      <span className="font-semibold text-green-400">
                        username:
                      </span>{" "}
                      {user.userInfo.name || "Đang tải..."}
                    </p>
                    <p>
                      <span className="font-semibold text-green-400">
                        Thắng / Thua:
                      </span>{" "}
                      <span className="text-green-500 font-bold">
                        {user.userInfo.win ?? 0}
                      </span>{" "}
                      /{" "}
                      <span className="text-red-400 font-bold">
                        {user.userInfo.loss ?? 0}
                      </span>
                    </p>
                  </div>
                ))}
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
      )}
    </>
  );
}

export default MatchForm;
