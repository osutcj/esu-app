import HouseService, { HouseType } from "../../services/houses.service";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";

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
              <Container>
                <Card sx={{ width: 'auto' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {house.name}
                    </Typography>
                    <Typography sx={{ mb:1.5 }} color="text.secondary">
                      {house.score}
                    </Typography>
                    <Typography variant="body2">
                      <h6>Coordonatorul xulescu</h6>
                      <p>Copil de clasa a 11 a 1</p>
                      <p>Copil de clasa a 11 a 2</p>
                      <p>Copil de clasa a 11 a 3</p>
                      <p>Copil de clasa a 11 a 4</p>
                    </Typography>
                  </CardContent>
                </Card>
              </Container>
            )})
        }
      </h1>
    </div>
  );
};
