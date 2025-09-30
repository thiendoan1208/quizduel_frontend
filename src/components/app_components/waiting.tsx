"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cancelMatchMaking, checkEnoughUser } from "@/service/game/before-game";
import { UserMatchInfo } from "@/type/game-type";
import { useMutation } from "@tanstack/react-query";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CHECK_GAP_TIME = 5;

function Waiting({
  isWaiting,
  setIsWaiting,
  getUserMatchInfo,
}: {
  isWaiting: boolean;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
  getUserMatchInfo: () => UserMatchInfo;
}) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (isWaiting) {
      const countUp = setInterval(() => {
        setCount((pre) => pre + 1);
      }, 1050);
      return () => {
        clearInterval(countUp);
      };
    } else {
      setCount(0);
    }
  }, [count, isWaiting]);

  useEffect(() => {
    if (isWaiting) {
      const checkUserNumber = setInterval(() => {
        checkEnoughUserMutate();
      }, CHECK_GAP_TIME * 1000);
      return () => {
        clearInterval(checkUserNumber);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaiting]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const userInfo = getUserMatchInfo();
      navigator.sendBeacon(
        "http://localhost:4000/api/before-game/waiting-queue/cancel",
        JSON.stringify(userInfo)
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [getUserMatchInfo]);

  const { mutate: checkEnoughUserMutate } = useMutation({
    mutationKey: ["checkEnoughUserMutate"],
    mutationFn: () => checkEnoughUser(),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: cancelMatchMutate } = useMutation({
    mutationKey: ["cancelMatchMutate"],
    mutationFn: () => {
      const userInfo = getUserMatchInfo();
      return cancelMatchMaking(userInfo);
    },
  });

  return (
    <div
      className={`w-screen h-screen top-0 left-0 fixed flex items-center justify-center z-30 bg-black/50`}
    >
      <Card className="w-[300px] h-[300px] flex flex-col items-center justify-evenly bg-black border-green-700 shadow shadow-green-400 p-4">
        <div className="text-green-500 text-xl">
          <span>Đang tìm đối thủ...</span>
          <span className="ml-2">{count}</span>
        </div>

        <div>
          <Hourglass size="60" bgOpacity="0.1" speed="1.75" color="green" />
        </div>

        <div
          onClick={() => {
            setIsWaiting(false);
            cancelMatchMutate();
          }}
          className="w-full"
        >
          <Button className="w-full cursor-pointer text-green-500 text-[14px]">
            Quay lại
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Waiting;
