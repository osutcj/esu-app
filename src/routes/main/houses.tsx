import React from "react";

export const Houses = () => {
  return (
    <div className="flex flex-col items-center gap-6 pb-64 pt-16 bg-slate-9 h-full">
      <h1 className="self-start ml-5 text-5xl font-extrabold text-slate-1">
        Houses{" "}
      </h1>
      <h1 className="self-start ml-5 text-4xl font-extrabold text-slate-1">
        Coming{" "}
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          soon
        </span>
        !
      </h1>
    </div>
  );
};
