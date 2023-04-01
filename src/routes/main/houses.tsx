import HouseService, { HouseType } from "../../services/houses.service";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactCardFlip from "react-card-flip";

export const Houses = () => {
  const [houses, setHouses] = useState<HouseType[]>([]);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  const getAllHouses = () => {
    HouseService.get()
      .then((response) => {
        setHouses(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex  flex-col items-center gap-6 pb-64 pt-16 bg-slate-9 h-full">
      <h1 className="self-start text-slate-1 w-100%">
        <text className=" text-5xl font-extrabold ml-7 mr-5">Houses</text>
        {houses.length > 0 &&
          houses.map((house) => {
            return (
              <ReactCardFlip
                key={house.id}
                isFlipped={isFlipped}
                flipDirection="horizontal"
              >
                <div
                  onClick={handleClick}
                  className="rounded-2xl  bg-gradient-to-r from-yellow-600 via-yellow-600 to-purple-700 p-1 shadow-xl mt-6 ml-5 mr-5 "
                >
                  <div className="flex">
                    <text className="ml-2 font-bold text-2xl flex-1 mb-1">
                      {house.name}
                    </text>
                    <text className="mr-2 font-bold text-2xl">
                      {house.score}
                    </text>
                  </div>
                  <a className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {house.code}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Lore</p>
                  </a>
                </div>
                <div
                  onClick={handleClick}
                  className="rounded-2xl bg-gradient-to-r from-yellow-600 via-yellow-600 to-purple-700 p-1 shadow-xl mr-5 ml-5 mt-6"
                >
                  <h4 className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
                    <div className="">
                      <h5 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Lista Participanti
                      </h5>

                      <p className="mt-2 text-sm text-gray-500">
                        <div className="flex">
                          <div className="flex-1">
                            <div>
                              {house.users.length > 0 &&
                                house.users.map((house) => {
                                  return <div>{house}</div>;
                                })}
                            </div>
                          </div>
                          <div>
                            <div>
                              {house.telefon.length > 0 &&
                                house.telefon.map((house) => {
                                  return <div>0{house}</div>;
                                })}
                            </div>
                          </div>
                        </div>
                      </p>
                    </div>
                  </h4>
                </div>
              </ReactCardFlip>
            );
          })}
      </h1>
    </div>
  );
};
