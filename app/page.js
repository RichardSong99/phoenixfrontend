"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { UserProvider, } from "./helper/context/usercontext";
import { QuestionProvider } from "./helper/context/questioncontext";
import { TestProvider } from "./study/activetest/activetestcontext";
import ContentViewer from "./helper/components/newquestionview/contentviewer";

export default function Home() {



  return (
    <UserProvider>
      <QuestionProvider>
        <TestProvider>
          <ContentViewer
            mode={"quiz"}
            quizID={'65f1c63d8e57129b0f22a041'}
          />
        </TestProvider>
      </QuestionProvider>
    </UserProvider>
  );
}
