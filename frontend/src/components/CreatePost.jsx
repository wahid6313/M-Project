import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataUrl } from "../lib/utils";
import { toast } from "sonner";
import axios from "axios";

function CreatePost({ open, setOpen }) {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  //   const [loading, setLoading] = useState(false);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataUrl(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    // console.log(caption, file);

    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      //   setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.response.data.message);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="">
        <DialogHeader className="font-semibold items-center ">
          Create new post
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src="https://photosking.net/wp-content/uploads/beautiful-girls-dp_116.webp"
              alt="img"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm cursor-pointer">Username</h1>
            <span className="text-sm text-gray-400">Bio here...</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border-none focus-visible:ring-transparent"
          placeholder="Write a caption..."
        />
        {imagePreview && (
          <div className="w-full h-96 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="preview-img"
              className="object-cover w-full h-96 rounded-lg"
            />
          </div>
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <div className="items-center text-center flex flex-col">
          <Button
            onClick={() => imageRef.current.click()}
            className="bg-blue-500 w-fit h-8 hover:bg-blue-600"
          >
            Select from computer
          </Button>
          {imagePreview && (
            <Button
              type="submit"
              onClick={createPostHandler}
              className="bg-white shadow-lg text-blue-600 hover:bg-blue-500 hover:text-white w-fit h-8  mt-5"
            >
              Post
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
