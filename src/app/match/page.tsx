"use client";

import MatchForm from "@/components/app_components/form/match";
import Header from "@/components/app_components/nav/header";
import { MatchContext } from "@/context/match";
import { UserContext } from "@/context/user";
import { getUser } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function QuizBackground() {
  const { user, login } = useContext(UserContext);
  const { matchInfo } = useContext(MatchContext);

  const { data: userQuery } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();
      login(response.data[0]);
      return response;
    },
    retry: false,
  });

  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center bg-[#0d0d1a] overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-0 w-full z-20">
          <Header
            loginSecret={userQuery && userQuery?.data[0].loginSecret}
            place="match"
          />
        </div>

        {/* Background animation */}
        <div className="absolute inset-0 animate-fade-glow bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.12)_0%,rgba(0,2,0,1)_70%)]" />

        {/* Main content */}
        {userQuery && user && (
          <MatchForm
            user={user}
            matchID={matchInfo.matchID}
            matchInfo={matchInfo}
          />
        )}
      </div>
    </div>
  );
}
