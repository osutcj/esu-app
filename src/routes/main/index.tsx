import { Icon, Paper, SvgIcon } from "@mui/material";
import { schedule } from "../../data/events";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

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
    <div className="flex flex-col items-center pb-64 bg-gray-1">
      <Paper
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <div className="flex items-center justify-center justify-between w-100% bg-white">
          <div className="p-5">
            <text className="text-2xl font-bold">Schedule</text>
          </div>
          <div className="">
            <PermIdentityIcon sx={{ fontSize: 35 }} className="mr-4" />
          </div>
        </div>
      </Paper>
      <div className="flex-col flex items-center pt-4 mt-20">
        {filterByDay.map(([day, events]) => {
          return (
            <div className="flex flex-col w-90% pb-4">
              <div className="pb-1 pl-2">
                <text className=" font-bold text-black">{day}</text>
              </div>
              {events.map((event) => {
                return (
                  <div className="flex flex-row justify-between items-center pb-2">
                    <div>
                      <div className="bg-gray-3 rounded-3xl pl-2.5 pr-2.5 pt-1.5 pb-1.5 ">
                        <text className="font-bold">{event.time}</text>
                      </div>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-yellow-400 to-purple-500 p-3.5 w-75% pl-2">
                      <text className="font-bold text-gray-800 text-lg">
                        {event.name}
                      </text>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainIndex;
