import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form className="flex flex-col gap-4 max-w-md w-full text-gray-500">
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type Here"
            className=" outline-none md:py-2.5 py-2  px-3 rounded border border-gray-500 "
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1 ">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className=" outline-none md:py-2.5 py-2 w-28  px-3 rounded border border-gray-500 "
              required
            />
          </div>
          <div className="flex md:flex-row flex-col gap-3 items-center">
            <p>Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className=" outline-none md:py-2.5 py-2 w-28  px-3 rounded border border-gray-500 "
            required
          />
        </div>

        <div>
          {chapters.map((chapter, index) => (
            <div key={index} className="bg-white border rounded-lg mb-4 ">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    alt=""
                    width={14}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold">
                    {index + 1}
                    {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length}Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mb-2"
                    >
                      <span>
                        {index + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free" : "Paid"}
                      </span>
                      <img src={assets.cross_icon} alt="" className="cursor-pointer"/>
                    </div>
                  ))}
                  <div className="inline-flex p-2 rounded bg-gray-100 cursor-pointer mt-2 ">+ Add Lecture</div>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center items-center bg-blue-100 p-2 cursor-pointer rounded-lg ">+ Add Chapter</div>
          {showPopup && (
             <div className="fixed inset-0 ">
                
             </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
