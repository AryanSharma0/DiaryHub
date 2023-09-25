import React, { useEffect, useState } from "react";
import { Background } from "./Background";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../Redux/Blog/Post/post_action";
import { useGetData } from "../../Hooks/useGetData";
const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const post = useGetData("postReducer", id);

  // If the post data is empty while in refresh case of updating post
  const checkPostData = () => {
    if (location.pathname === "/blogs/add") {
    } else {
      if (post === undefined || post === null || post === "undefined") {
        navigate("/blogs");
      }
    }
  };
  useEffect(() => {
    checkPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const tempData =
    location.pathname === "/post/add"
      ? {
          image: null,
          about: "",
          tag: "",
        }
      : post;
  const tempImage = location.pathname === "/blogs/add" ? null : post?.image;
  const [formData, setFormData] = useState(tempData);
  const [previewImage, setPreviewImage] = useState(tempImage);

  // Getting form data
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // On Adding image
  const imageAdd = (e) => {
    const file = e.target.files[0]; // Access the file from e.target.files[0]
    setFormData({ ...formData, image: file }); // Assign the file to image property
    setPreviewImage(URL.createObjectURL(file));
  };

  // On removing image
  const removeImage = () => {
    setFormData({ ...formData, image: null }); // Set image to null to remove it
    setPreviewImage(null);
  };

  // For uploading the form data
  const authToken = useSelector((state) => state.authReducer.authToken);
  const uploadPost = (e) => {
    e.preventDefault();
    if (
      formData.about.length > 3 &&
      formData.tag.length > 2 &&
      formData.image
    ) {
      const postData = new FormData();
      postData.append("image", formData.image);
      postData.append("about", formData.about);
      postData.append("tag", formData.tag);
      postData.append("_id", post?._id);
      console.log(formData.image);
      location.pathname === "/blogs/add"
        ? // For new created blog
          dispatch(addPost(postData, authToken))
        : // for updation of blog
          dispatch(updatePost(postData, authToken));
      navigate("/blogs");
    } else {
      alert("Please fill all fields");
    }
  };

  // On back
  const moveBack = () => {
    navigate("/blogs");
  };

  return (
    <div>
      <div className=" absolute w-screen h-screen flex justify-center item-center ">
        <Background />
      </div>

      <section className="w-full h-[100vh] overflow-hidden relative ">
        <div className=" min-h-screen w-full flex justify-center  py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover  items-center">
          <div className="absolute w-full   bg-black  opacity-60 inset-0 z-0 backdrop-blur-sm"></div>
          <form
            onSubmit={uploadPost}
            method="post"
            encType="multipart/form-data"
            className="w-full lg:w-[70vw] p-10  bg-[#181f25a6] h-[100vh]  drop-shadow-2xl shadow-2xl  "
          >
            <div className="flex justify-between">
              <button
                className="flex justify-start  items-center"
                onClick={moveBack}
              >
                <MdArrowBackIosNew color="white" size={30} />
              </button>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" w-[10rem] flex justify-between bg-neutral-300 text-gray-800 px-4 py-[.81rem]  rounded-xl tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-gray-800 active:bg-neutral-900 active:scale-95 hover:text-neutral-200 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  <BsUpload
                    color="#181f25"
                    className="hover:text-neutral-800"
                    size={26}
                  />
                  <span>Upload</span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-100">
                Add Post
              </h2>
            </div>
            <div className="mt-8 space-y-3 ">
              <div className="grid grid-cols-1 space-y-2   ">
                {previewImage !== null ? (
                  <div className="w-full flex justify-center items-center">
                    <img
                      onClick={removeImage}
                      src={previewImage}
                      className="h-[35vh] w-6/12 cursor-pointer bg-center  bg-cover   rounded-lg"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex  items-center justify-center  w-full">
                    <label className="flex flex-col cursor-pointer transition ease-in duration-300 rounded-lg  border-2  w-[70%] h-[40vh] p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                        <div className="flex items-center justify-center  flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                          <img
                            className="has-mask h-36 "
                            src={require("../../assets/addblogInput.avif")}
                            alt=""
                          />
                        </div>
                        <p className="pointer-none text-gray-300 ">
                          <span className="text-sm">Drag and drop</span> files
                          here <br /> or{" "}
                          <Link
                            href=""
                            id=""
                            className="text-blue-600 hover:underline"
                          >
                            select a file
                          </Link>
                          from your computer
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={imageAdd}
                        name="image"
                      />{" "}
                    </label>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm  font-bold text-gray-100 tracking-wide">
                  About
                </label>
                <textarea
                  className="text-base p-2 bg-[#12171ba6] border border-gray-200/60 rounded-lg focus:outline-none  focus:border-zinc-800"
                  type=""
                  placeholder="Enter description here....."
                  name="about"
                  value={formData?.about}
                  onChange={onChange}
                />
              </div>
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-200 tracking-wide">
                  Tags
                </label>
                <input
                  name="tag"
                  value={formData?.tag}
                  className="text-base p-2 bg-[#12171ba6] border rounded-md border-gray-200/60 focus:outline-none"
                  type=""
                  placeholder="Add some tags here....."
                  onChange={onChange}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewPost;
