"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { UserProvider, } from "./context/usercontext";
import { QuestionProvider } from "./context/questioncontext";

export default function Home() {



  return (
    <UserProvider>
      <QuestionProvider>

        <main>
          <p>Hello </p>
        </main>
      </QuestionProvider>
    </UserProvider>
  );
}
