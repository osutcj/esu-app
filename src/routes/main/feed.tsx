import React, { useState, useEffect } from "react";
import { UserType } from "../../types/users";
import UserService from "../../services/users.service";
import { db } from "../../util/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { DocumentData } from "firebase/firestore";
import logo from "../../static/pwa-512x512.png";
import PostService, { PostType } from "../../services/posts.service";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@mui/material";

export const Feed = () => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [time, setTime] = useState("");
  const [user, setUser] = useState<UserType>();
  const [authState] = useAuthState(auth);
  const [post, setPost] = useState<PostType[]>([]);
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
  const getAllPosts = () => {
    PostService.get()
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePost = () => {
    PostService.insert({
      message: message,
      time: time,
    }).catch((error) => {
      alert(error.message);
    });
    console.log("POST ADDED");
    setModal(false);
  };
  useEffect(() => {
    getAllPosts();
  }, [handlePost]); //AICI CRED CA E BAI :))))
  return (
    <div className="flex  flex-col items-center  pb-64 bg-#333333 h-full ">
      <div className=" bg-#1A1A1A w-85 mt-20 h-20 rounded-xl text-10 font-bold justify-center items-center flex p-2">
        <div className="color-white ">FEED</div>
      </div>
      <div
        className="bg-#1A1A1A mt-2 color-white rounded-xl p-1 flex self-end mr-2"
        onClick={() => setModal(true)}
      >
        Add Post
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <div
          outline="none"
          style={{
            backgroundColor: "white",
            height: "calc(100% - 400px)", // subtract 200px from height (100px top + 100px bottom margin)
            width: "calc(100% - 60px)", // subtract 200px from width (100px left + 100px right margin)
            marginTop: "200px",
            marginBottom: "200px",
            marginLeft: "30px",
            marginRight: "30px",
            borderRadius: "10px",
            opacity: 0.9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="color-black p-2 pt-1">Message:</div>
          <textarea
            style={{
              width: "calc(100%)",
              backgroundColor: "lightgray",
              color: "black",
              height: "calc(40%)",
              borderRadius: "10px",
              padding: "10px",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            wrap="soft"
          />
          <div className="color-black p-2 pt-1">Time:</div>

          <textarea
            style={{
              width: "100%",
              backgroundColor: "lightgray",
              color: "black",
              height: "20%",
              borderRadius: "10px",
              padding: "10px",
            }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            wrap="soft"
          />
          <div
            className="bg-blue-300 w-20 mt-6 h-10 items-center flex justify-center "
            style={{ borderRadius: 10 }}
            onClick={handlePost}
          >
            Post
          </div>
        </div>
      </Modal>

      {post.length > 0 &&
        post.map((post, index) => {
          return (
            <div className="bg-#1A1A1A w-85 mt-2 rounded-xl font-bold p-2">
              <div className="flex justify-between gap-2 ">
                <div className="flex-none">
                  <img src={logo} width={50} height={50} />
                </div>
                <div className="flex-row flex-grow">
                  <div className="color-white text-4.5">Vlad Demean</div>
                  <div className="color-white text-2.5 text-gray-500">
                    COORDONATOR
                  </div>
                </div>
                <div className="flex-none">
                  <div className="text-white text-3.2">{post.time}</div>
                </div>
              </div>
              <div
                className="color-white text-3"
                style={{
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  msWordBreak: "break-all",
                  wordBreak: "break-word",
                  margin: 10,
                }}
              >
                {post.message}
              </div>
            </div>
          );
        })}
    </div>
  );
};
