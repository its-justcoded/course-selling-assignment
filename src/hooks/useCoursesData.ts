import { useState,useEffect } from "react";

const BASE_URL = "https://syncsphere-hiv6.onrender.com";

export type Course = {
    courseName:string;
    courseCode:string;
    description:string;
    mainCategory:string;
    shortCourse:string;
    courseType:string;
    pricePaise:number;
    priceUsdCents:number;
    mangoId:string;
    refundable:boolean;
};


export type Currency ="IN" | "US";

export type CoursesState = 
| {status:"loading"}
| {status:"error"; message: string}
| {status:"empty"}
| {status:"success";courses:Course[]; currency: Currency };

export function useCoursesData(){
    const [state,setState] = useState<CoursesState>({status:"loading"});

    useEffect(()=> {
        let cancelled = false;

        async function fetchData() {
            setState({status:"loading"});

            //fetch courses - this one must succeed , it's the core data.
            let courses: Course[] = [];
            try{
                const res = await fetch (`${BASE_URL}/assignment/course-data`);
                if(!res.ok) {
                    throw new Error(`course API failed:${res.status}`);
                }
                courses = await res.json();
            }
            catch(err){
                if (!cancelled){
                    setState({status:"error",message:"Could not load courses.Please try again"});
                }
                return;//stop here - no point fetching currency if courses failed
            }
        

        //fetch country code -allowed to fail independently
        //falls back to a default currency instead of breaking the whole section.

        let currency:Currency ="US";
        try{
            const res = await fetch(`${BASE_URL}/assignment/country-code`);
            if (res.ok){
                const data = await res.json();
                if(data.country_code ==="IN"|| data.country_code === "US"){
                    currency = data.country_code;
                }
            }
        }
        catch{
            //silently fall back to default cyrrency - intentional
        }

        if (cancelled) return;

        if (courses.length === 0){
            setState({status:"empty"});
        }
        else{
            setState({status:"success",courses,currency});
        }
    } // fetch close here before the call 
    fetchData();

     return() => {
        cancelled = true;
    };
    }, []);


    return state;
}