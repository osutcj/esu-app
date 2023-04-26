import HouseService, { HouseType } from "../../services/houses.service";
import { useEffect, useState } from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ReactCardFlip from "react-card-flip";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export const Houses = () => {
  const [houses, setHouses] = useState<HouseType[]>([]);

  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);

  const handleClick = (index: number) => {
    setIsFlipped((prevState) => {
      let newState = [...prevState];
      let state = newState[index];
      if (state) {
        newState[index] = false;
      } else {
        newState[index] = true;
      }

      return newState;
    });
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
    <div className="flex  flex-col items-center gap-6 pb-64 pt-16 bg-gray-2 h-full">
      <h1 className="self-start text-slate-1 w-100% pt-8">
        {houses.length > 0 &&
          houses.map((house, index) => {
            return (
              <div key={index}>
                <ReactCardFlip
                  isFlipped={isFlipped[index]}
                  flipDirection="vertical"
                >
                  <div
                    onClick={() => handleClick(index)}
                    id={index.toString()}
                    className="rounded-2xl bg-gradient-to-r from-yellow-600 via-yellow-600 to-purple-700 p-1 mt-6 ml-5 mr-5 "
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
                    onClick={() => handleClick(index)}
                    id={index.toString()}
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
              </div>
            );
          })}
      </h1>
    </div>
  );
};
