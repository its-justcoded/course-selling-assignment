import { APITester } from "./APITester";
import CourseSection from "./components/courseSection";
import Footer from "./components/footer";
import Hero from "./components/hero";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  
  return (
    <div className="app">
      <Hero/>
      <CourseSection/>
      <Footer/>
    </div>
  );
}

export default App;
