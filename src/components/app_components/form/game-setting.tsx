"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { findTopic, getTopic } from "@/service/topic";
import { Topic } from "@/type/topic-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bot, User, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

const NUMBER_OF_TOPIC = 3;

const PLAY_TYPE = [
  {
    type: "Chơi với máy",
    icon: <Bot className="size-7" />,
    value: "bot",
  },
  {
    type: "Chơi với người",
    icon: <User className="size-7" />,
    value: "player",
  },
];

function GameSetting({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const playTypeRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Topic[] | null>(null);
  const [isResultExist, setIsResultExist] = useState<boolean>(true);

  const [topicGroupLetter, setTopicGroupLetter] = useState<string[]>([]);
  const [userTopicName, setUserTopicName] = useState<string[]>([]);
  const [userTopicValue, setUserTopicValue] = useState<string[]>([]);
  const [userTopicIndex, setUserTopicIndex] = useState<number[]>([]);

  useEffect(() => {
    highlightTopicItem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTopicName, searchResult, isResultExist]);

  const { data: topics, isPending: gettingTopic } = useQuery({
    queryKey: ["topic"],
    queryFn: () => {
      return getTopic();
    },
  });

  const { mutate: filterTopicMutate, isPending: findingTopic } = useMutation({
    mutationKey: ["filterTopicMutate"],
    mutationFn: (keyword: string) => {
      return findTopic(keyword);
    },
    onSuccess: (data) => {
      setSearchResult(data.data);

      if (data.data.length > 0) {
        setIsResultExist(true);
      } else {
        setIsResultExist(false);
      }
    },
  });

  const getPlayType = (index: number) => {
    if (playTypeRef.current) {
      Array.from(playTypeRef.current.children).forEach((child) => {
        child.classList.remove("border-green-200", "text-green-300");
      });

      playTypeRef.current.children[index].classList.add(
        "border-green-200",
        "text-green-300"
      );

      // Lưu type
    }
  };

  const checkExistTopic = (inputTopic: string, savedTopic: string[]) => {
    const isTopicExist = savedTopic.includes(inputTopic);
    return isTopicExist;
  };

  const checkValidAmountTopic = (amount: number, savedTopic: string[]) => {
    return savedTopic.length >= amount ? false : true;
  };

  const modifyUserTopic = (
    groupLetter: string,
    topicGroupIndex: number,
    topicItemIndex: number,
    name: string,
    value: string
  ) => {
    if (topicRef.current) {
      const topicGroup = topicRef.current.children[topicGroupIndex];
      const topicItem = topicGroup.children[1].children[topicItemIndex];

      const isTopicExist = checkExistTopic(name, userTopicName);

      if (isTopicExist) {
        const topicIndex = userTopicName.indexOf(name);
        topicItem.classList.remove("border-green-200", "text-green-300");

        setUserTopicIndex((prev) => prev.filter((_, i) => i !== topicIndex));
        setUserTopicName((prev) => prev.filter((_, i) => i !== topicIndex));
        setUserTopicValue((prev) => prev.filter((_, i) => i !== topicIndex));
        setTopicGroupLetter((prev) => prev.filter((_, i) => i !== topicIndex));
      } else {
        const isAmountTopicValid = checkValidAmountTopic(
          NUMBER_OF_TOPIC,
          userTopicName
        );

        if (isAmountTopicValid) {
          setUserTopicIndex([...userTopicIndex, topicItemIndex]);
          setUserTopicName([...userTopicName, name]);
          setUserTopicValue([...userTopicValue, value]);
          setTopicGroupLetter([...topicGroupLetter, groupLetter]);
          topicItem.classList.add("border-green-200", "text-green-300");
        } else {
          toast.error("Chỉ được chọn tối đa 3 chủ đề");
        }
      }
    }
  };

  const highlightTopicItem = () => {
    if (topicRef.current) {
      const topicGroup: string[] = [];
      const topicIndex: number[] = [];

      Array.from(topicRef.current.children).forEach((item) => {
        topicGroup.push(item.children[0].innerHTML);
      });

      topicGroupLetter.forEach((topic) => {
        const index = topicGroup.indexOf(topic);
        topicIndex.push(index);
      });

      topicIndex.forEach((topicIndex, index) => {
        if (topicRef.current?.children[topicIndex]) {
          const topicItemIndex = userTopicIndex[index];

          topicRef.current.children[topicIndex].children[1].children[
            topicItemIndex
          ].classList.add("border-green-200", "text-green-300");
        }
      });
    }
  };
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } min-w-[500px] w-full h-screen top-0 left-0 flex items-center justify-center`}
    >
      <Card className="w-[500px] bg-black border-green-700 text-white px-4">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-green-500">
              Chọn chế độ:
              <span className="text-sm text-white/90 font-light">
                {" "}
                <span className="text-red-500 text-xl">*</span>
                Bắt buộc phải chọn 1 chế độ chơi.
              </span>
            </h1>
            <X
              onClick={() => {
                setIsOpen(false);
                setSearchResult(null);
                setIsResultExist(true);
              }}
              className="text-green-500 cursor-pointer"
            />
          </div>
          <div
            ref={playTypeRef}
            className="flex items-center justify-center gap-2 mt-4"
          >
            {PLAY_TYPE.map((type, index) => (
              <div
                key={`type-${index}`}
                onClick={() => {
                  getPlayType(index);
                }}
                className={`${type.value} hover:border-green-500/50 hover:text-green-500/50 transition-all delay-75 text-xl space-y-1 border-2 border-gray-500 rounded-2xl p-2 w-full flex flex-col items-center justify-center cursor-pointer`}
              >
                {type.icon}
                <h1>{type.type}</h1>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-green-500">
            Chọn chủ đề:
            <span className="text-sm text-white/90 font-light">
              {" "}
              <span className="text-red-500 text-xl">*</span>
              Bạn có thể chọn tối đa {NUMBER_OF_TOPIC} chủ đề.
            </span>
          </h1>
        </div>

        <div className="border rounded-lg border-green-700">
          <div className="p-2">
            <Input
              value={keyword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (keyword.length > 0) {
                    filterTopicMutate(keyword);
                  }
                  if (keyword.length === 0) {
                    setSearchResult(null);
                    setIsResultExist(true);
                  }
                }
              }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="border-2 border-gray-500 text-white focus:border-green-500 transition-all"
              placeholder="Tìm kiếm chủ đề..."
            />
            <div className="mt-2 mb-0 border-1 border-b border-gray-500 rounded-full"></div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              {gettingTopic ? (
                <div className="flex items-center justify-center my-3">
                  <HashLoader color="green" />
                </div>
              ) : (
                <div ref={topicRef}>
                  {isResultExist &&
                  !findingTopic &&
                  searchResult !== null &&
                  searchResult.length > 0 ? (
                    <>
                      {searchResult.map((topic, topicGroupIndex) => (
                        <div key={topic._id}>
                          <span
                            className="text-4xl text-green-500"
                            style={{
                              fontFamily: "var(--font-vt323), sans-serif",
                            }}
                          >
                            {topic.letter}
                          </span>

                          <div className="grid grid-cols-2 gap-2">
                            {topic &&
                              topic.topics.map((item, topicItemIndex) => (
                                <div
                                  onClick={() => {
                                    modifyUserTopic(
                                      topic.letter,
                                      topicGroupIndex,
                                      topicItemIndex,
                                      item.name,
                                      item.value
                                    );
                                  }}
                                  key={`item-${item.value}`}
                                  className="hover:border-gray-500/80 hover:text-green-500/80 flex items-center justify-center border-2 border-gray-500 rounded-xl cursor-pointer py-1 px-1"
                                >
                                  <p className="text-sm">{item.name}</p>
                                  <span className="hidden">{item.value}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <>
                        {isResultExist &&
                          !findingTopic &&
                          topics &&
                          topics.success &&
                          topics.data.map((topic, topicGroupIndex) => (
                            <div key={topic._id}>
                              <span
                                className="text-4xl text-green-500"
                                style={{
                                  fontFamily: "var(--font-vt323), sans-serif",
                                }}
                              >
                                {topic.letter}
                              </span>

                              <div className="grid grid-cols-2 gap-2">
                                {topic &&
                                  topic.topics.map((item, topicItemIndex) => (
                                    <div
                                      onClick={() => {
                                        modifyUserTopic(
                                          topic.letter,
                                          topicGroupIndex,
                                          topicItemIndex,
                                          item.name,
                                          item.value
                                        );
                                      }}
                                      key={`item-${item.value}`}
                                      className="hover:border-gray-500/80 hover:text-green-500/80 flex items-center justify-center border-2 border-gray-500 rounded-xl cursor-pointer py-1 px-1"
                                    >
                                      <p className="text-sm">{item.name}</p>
                                      <span className="hidden">
                                        {item.value}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </>
                    </>
                  )}
                </div>
              )}

              {!isResultExist && (
                <div>
                  <h1>Không có kết quả tìm kiếm phù hợp.</h1>
                </div>
              )}

              <div className="flex items-center justify-center">
                {findingTopic && <HashLoader color="green" />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-white/75">Đã chọn:</span>
            <div className="flex items-center flex-wrap space-x-2 text-green-400 font-bold">
              {userTopicName.map((item, index) => (
                <span key={`${item}-${index}`}>{item},</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Button className="w-full cursor-pointer">
            {/* onClick={() => {
                setIsModalOpen(false);
              }} */}

            <span className="text-xl font-bold text-green-500">Xác nhận</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default GameSetting;
