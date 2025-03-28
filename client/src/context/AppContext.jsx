import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from '@clerk/clerk-react'

 export const AppContext = createContext();

 export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate(); 
    const {getToken} = useAuth();
    const {user} = useUser();

    const [allcourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);


    const fetchUserEnrolledCourses = async()=>{
           setEnrolledCourses(dummyCourses)
    }

    const fetchAllCourses = async () => {
         setAllCourses(dummyCourses)
    };

    const calculateRating = (course) => {
           if(course.courseRatings.length === 0){
              return 0;
           }
           let totalRating = 0;
            course.courseRatings.forEach(rating => {
                totalRating += rating.rating;
            });
            return totalRating/course.courseRatings.length;
      };

    const CalculateChapterTime = (chapter)=>{
          let time = 0;
          chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration);
          return humanizeDuration(time*1000*60,{units:['h','m']});
    }


    const CalculateCourseDuration = (course)=>{
          let time = 0;
          course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
          return humanizeDuration(time*1000*60,{units:['h','m']})
    }

    const CalculateNoOfLectures = (course)=>{
           let totalLectures = 0;
           course.courseContent.forEach(chapter => {
               if(Array.isArray(chapter.chapterContent)){
                  totalLectures += chapter.chapterContent.length;
               }
           })
           return totalLectures;

    }

    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[]);

    const logToken = async()=>{
        console.log(await getToken())
    }   

    useEffect(()=>{
           if(user){
             logToken()
           }
    },[user])

    const value = { fetchUserEnrolledCourses,enrolledCourses,CalculateNoOfLectures,CalculateCourseDuration,CalculateChapterTime,currency,allcourses,navigate,calculateRating,isEducator,setIsEducator};
   return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
 }

