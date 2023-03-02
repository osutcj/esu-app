import HouseService, { HouseType } from "../../services/houses.service";
import { useEffect, useState } from "react";

export const Houses = () => {

  const [houses, setHouses] = useState<HouseType[]>([])

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
    <div className="flex flex-col items-center gap-6 pb-64 pt-16 bg-slate-9 h-full">
      <h1 className="self-start ml-5 text-5xl font-extrabold text-slate-1">
        {houses.length > 0 && 
          houses.map((house) => {
            return(
              <>
                <p>{house.name}</p>
              </>
            )})
        }
      </h1>
    </div>
  );
};
