import { Outlet } from "react-router-dom";
import { schedule } from "../../data/events";

const MainIndex = () => {
  // console.log(Object.entries(schedule));
  return (
    <div className="flex flex-col items-center gap-6 pb-64 pt-16 bg-slate-9">
      <h1 className="self-start ml-5 text-5xl font-extrabold text-slate-1">
        {" "}
        Schedule{" "}
      </h1>
      {Object.entries(schedule).map(([day, events]) => {
        return (
          <div className="w-90% bg-gradient-to-tr from-slate-800 to-slate-900 text-slate-2 rounded-3xl p-8">
            <h2 className="text-3xl mb-6 font-bold">{day}</h2>
            {events.map((event) => {
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <div className="flex-1">{event.name}</div>
                    <div className="">{event.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MainIndex;
