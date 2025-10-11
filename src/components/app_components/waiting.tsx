"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MatchContext } from "@/context/match";
import { UserContext } from "@/context/user";
import {
  addUserToMatch,
  cancelMatchMaking,
  checkEnoughUser,
  deleteMatch,
} from "@/service/game/before-game";
import { EnoughUser, UserMatchInfo } from "@/type/game-type";
import { useMutation } from "@tanstack/react-query";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const CHECK_GAP_TIME = 1;

function Waiting({
  isWaiting,
  setIsWaiting,
  getUserMatchInfo,
}: {
  isWaiting: boolean;
  setIsWaiting: Dispatch<SetStateAction<boolean>>;
  getUserMatchInfo: () => UserMatchInfo;
}) {
  const router = useRouter();

  const { user } = useContext(UserContext);
  const { matchInfo, setMatch } = useContext(MatchContext);

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
      const userMatch = {
        username: user.name,
        matchID: matchInfo.matchID,
      };
      if (process.env.NEXT_PUBLIC_CANCEL_MATCH) {
        navigator.sendBeacon(
          process.env.NEXT_PUBLIC_CANCEL_MATCH,
          JSON.stringify(userInfo)
        );
      }
      if (process.env.NEXT_PUBLIC_DELETE_MATCH) {
        navigator.sendBeacon(
          process.env.NEXT_PUBLIC_DELETE_MATCH,
          JSON.stringify(userMatch)
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [getUserMatchInfo, matchInfo.matchID, user.name]);

  const { mutate: checkEnoughUserMutate } = useMutation({
    mutationKey: ["checkEnoughUserMutate"],
    mutationFn: () => checkEnoughUser(),
    onSuccess: (data) => {
      if (data !== null) {
        checkSuitableUser(data);
      }
    },
  });

  const { mutate: cancelMatchMutate } = useMutation({
    mutationKey: ["cancelMatchMutate"],
    mutationFn: () => {
      const userInfo = getUserMatchInfo();
      return cancelMatchMaking(userInfo);
    },
  });

  const { mutate: addUserToMatchMutate } = useMutation({
    mutationKey: ["addUserToMatchMutate"],
    mutationFn: (username: string) => {
      return addUserToMatch(username);
    },
    onSuccess: (data) => {
      setMatch(data.data);
      router.push("/match");
    },
  });

  const { mutate: deleteMatchMutate } = useMutation({
    mutationKey: ["deleteMatchMutate"],
    mutationFn: (user: { username: string; matchID: string }) => {
      return deleteMatch(user);
    },
  });

  const checkSuitableUser = (data: EnoughUser) => {
    const totalUserInWaitingQueue = data.data.numberOfUserIsWaiting.user;
    const usernameInWaitingQueue = data.data.matchUsers.map(
      (user) => user.userInfo.name
    );

    if (
      usernameInWaitingQueue?.includes(user.name) &&
      totalUserInWaitingQueue &&
      totalUserInWaitingQueue >= 2
    ) {
      addUserToMatchMutate(user.name);
    } else if (!usernameInWaitingQueue.includes(user.name)) {
      addUserToMatchMutate(user.name);
    }
  };

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
            deleteMatchMutate({
              username: user.name,
              matchID: matchInfo.matchID,
            });
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
