import React, { useState, useEffect } from "react";
import { UserType } from "../../types/users";
import UserService from "../../services/users.service";
import { db } from "../../util/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const ProfileScreen = () => {
  const [user, setUser] = useState<UserType>();
  const [authState] = useAuthState(auth);

  useEffect(() => {
    const fetchUser = async () => {
      const userGet = await UserService.getById(authState?.uid);
      setUser({...(userGet?.data as UserType)});
    };

    fetchUser();
  }, []);

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
    console.log(image)
    }
  };

  return (
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
  );
};

export default ProfileScreen;