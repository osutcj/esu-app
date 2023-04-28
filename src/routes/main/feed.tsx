import React, { useState, useEffect } from "react";
import { UserType } from "../../types/users";
import UserService from "../../services/users.service";
import { db } from "../../util/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { DocumentData } from "firebase/firestore";

export const Feed = () => {
  const [user, setUser] = useState<UserType>();
  const [authState] = useAuthState(auth);

  useEffect(() => {
    UserService.getById(authState?.uid).then(
      (response: DocumentData | undefined) => {
        if (response?.data != undefined) {
          setUser({
            id: response.data.id,
            house: response.data.house,
            score: response.data.score,
          } as UserType);
        }
      }
    );
  }, [authState, user]);

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      //   const storageRef = db.ref();
      //   const fileRef = storageRef.child(image.name);
      //   await fileRef.put(image);
      //   const url = await fileRef.getDownloadURL();
      //   setImageUrl(url);
      console.log(image);
      console.log(user);
    }
  };

  return (
    <div className="flex  flex-col items-center  pb-64 bg-#333333 h-full">
      <div className=" bg-#1A1A1A w-85 mt-20  rounded-xl text-10 font-bold justify-center flex p-2">
        <div
          className="color-white "
          style={{
            alignSelf: "center",
          }}
        >
          FEED
        </div>
      </div>
      <div>
        <h1>{user?.id}'s Profile</h1>
        {/* <img src={imageUrl || user.profileImageUrl} alt="Profile" /> */}
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Upload Image</button>
        {/* <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p> */}
        <p>{user?.house}</p>
        <p>{user?.score}</p>
      </div>
    </div>
  );
};
