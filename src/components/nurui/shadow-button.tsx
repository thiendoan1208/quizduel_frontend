import { Swords } from "lucide-react";
import React from "react";

const HoverShadowButton = ({ text }: { text: string }) => {
  return (
    <button className="cursor-pointer w-full relative px-8 py-3 bg-black text-white font-semibold rounded-full border-2 border-green-500 hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(34,197,94,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(34,197,94,0.4)] group">
      <span className="flex items-center justify-center space-x-2">
        <Swords className="text-green-500 text-xl" />
        <span>{text}</span>
      </span>
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-green-500/20 to-black/20" />
    </button>
  );
};

export default HoverShadowButton;
