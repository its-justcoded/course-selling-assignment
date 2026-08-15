import { useCoursesData } from "@/hooks/useCoursesData";
import type { Course, Currency } from "@/hooks/useCoursesData";


function formatPrice (course:Course,currency: Currency):string{
    if (currency === "IN"){
        const rupees = course.pricePaise/100;
        return new Intl.NumberFormat("en-IN",{
            style:"currency",
            currency:"INR",
        }).format(rupees);
    }
    else{
        const dollars = course.priceUsdCents /100;
        return new Intl.NumberFormat("en-US",{
            style:"currency",
            currency:"USD",
        }).format(dollars)
    }
}

function CourseCard ({course,currency}:{course:Course; currency:Currency}){
    return(
        <div className="course-card">
            <h3 className="course-card-title">{course.courseName}</h3>
            <p className="course-card-description">{course.description}</p>
            <div className="course-card-footer">
                <span className="course-card-price">{formatPrice(course,currency)}</span>
                <span className="course-card-category">{course.mainCategory}</span>
            </div>
        </div>
    );
}

function CourseSection(){
    const state = useCoursesData();

    return(
        <div id = "courses" className="course-section">
            <h2 className="course-section-title">Explore Our Courses</h2>

            {state.status === "loading" &&(
                <p className="course-status">Loading courses...</p>
            )}

            {state.status === "error" &&(
                <p className="course-status course-status-error">{state.message}</p>
            )}

            {state.status === "empty" &&(
                <p className="course-status">No courses available right now.</p>
            )}

            {state.status === "success" &&(
                <div className="course-grid">
                    {state.courses.map((course)=>(
                        <CourseCard key={course.mangoId} course={course} currency={state.currency}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseSection;