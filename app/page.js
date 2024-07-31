"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { UserProvider, } from "./helper/context/usercontext";
import { QuestionProvider } from "./helper/context/questioncontext";
import ContentViewer from "./helper/components/newquestionview/contentviewer";

export default function Home() {



  return (
    <UserProvider>
      <QuestionProvider>

        <ContentViewer
          review={false}
          quizID={'65ed336b2859e9955324fc80'}
          quizName={'Linear equations in 1 variable'}
        />
      </QuestionProvider>
    </UserProvider>
  );
}
