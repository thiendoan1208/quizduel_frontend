"use client";

import GameSetting from "@/components/app_components/form/game-setting";
import HoverShadowButton from "@/components/nurui/shadow-button";
import { Card } from "@/components/ui/card";
import { User } from "@/type/user-type";
import { useState } from "react";

function UserMainForm({ user }: { user: User }) {
  const [isGameSettingOpen, SetIsGameSettingOpen] = useState<boolean>(false);

  return (
    <div className="z-20 space-y-2 max-w-[500px] px-3 md:px-0">
      <div className="space-y-1 flex flex-col items-center">
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-wide text-white">
          Welcome
          <span
            className="animate-blink-neon ml-2 font-bold text-neon"
            style={{
              fontFamily: "var(--font-exo2), sans-serif",
            }}
          >
            {user.name}
          </span>
        </h1>

        <p className="text-[0.9rem] md:text-[1rem] text-white/70 font-light">
          Click hướng dẫn nếu bạn không hiểu chuyện gì đang xảy ra.
        </p>
      </div>

      <div className="mt-4 flex flex-col justify-between">
        <div className="flex items-center justify-center gap-6">
          <Card className="py-2 rounded-full border border-green-700 backdrop-blur-[1px] w-full flex items-center justify-center gap-2 bg-white/5 text-white">
            <p className="flex items-center">
              <span className="text-xl text-white/60 font-bold">Victory:</span>
              <span
                className="text-4xl ml-2 text-green-500 "
                style={{
                  fontFamily: "var(--font-vt323), sans-serif",
                }}
              >
                {user.win}
              </span>
            </p>
          </Card>

          <Card className="py-2 rounded-full border border-red-700 backdrop-blur-[1px] w-full flex items-center justify-center gap-2 bg-white/5 text-white">
            <p className="flex items-center">
              <span className="text-xl text-white/60 font-bold">Defeat:</span>
              <span
                className="text-4xl ml-2 text-red-500"
                style={{
                  fontFamily: "var(--font-vt323), sans-serif",
                }}
              >
                {user.loss}
              </span>
            </p>
          </Card>
        </div>

        <div
          onClick={() => {
            SetIsGameSettingOpen(true);
          }}
          className="flex items-center justify-center mt-6"
        >
          <HoverShadowButton text={"Tìm Trận"} />
        </div>

        <GameSetting
          isOpen={isGameSettingOpen}
          setIsOpen={SetIsGameSettingOpen}
        />
      </div>
    </div>
  );
}

export default UserMainForm;
