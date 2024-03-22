import React from "react";
import styles from "./lessonmain.module.css";

const LessonText = ({ lessonText }) => {

console.log(lessonText)

if(!lessonText) return <div> Select a lesson text </div>


  return <div className = {styles.allLessonText}>

    <div className = {styles.lessonText}>
        

        <iframe className = {styles.pdfLessonText} src = {"https://www.uc.edu/content/dam/refresh/cont-ed-62/olli/fall-23-class-handouts/SpaceX%202.pdf"}/>
    
    
    </div>




  </div>;
}

export default LessonText;