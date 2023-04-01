import { schedule } from "../../data/events";

const MainIndex = () => {
  const today = new Date();
  let currDay = today.toString();
  let month = currDay.split(" ")[1];
  let day = currDay.split(" ")[2];

  const hashMonth: any = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  let filterByDay = Object.entries(schedule).filter(([date, events]) => {
    let thisDay = date.split(" ")[0];
    let thisMonth = date.split(" ")[1];

    if (parseInt(hashMonth[thisMonth]) == parseInt(hashMonth[month])) {
      if (parseInt(thisDay) >= parseInt(day)) {
        return [date, events];
      }
    }
    if (parseInt(hashMonth[thisMonth]) > parseInt(hashMonth[month])) {
      return [date, events];
    }
  });

  return (
    <div className="flex flex-col items-center gap-6 pb-64 pt-16 bg-slate-9">
      <h1 className="self-start ml-5 text-5xl font-extrabold text-slate-1">
        {" "}
        Schedule{" "}
      </h1>
      {filterByDay.map(([day, events]) => {
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
