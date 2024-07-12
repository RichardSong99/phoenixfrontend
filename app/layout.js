"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import SiteNavBar from './helper/components/sitenavbar/sitenavbar'; // Import SiteNavBar
import { UserProvider, } from './helper/context/usercontext';
import { QuestionProvider } from './helper/context/questioncontext';
import { DataProvider } from "./helper/context/datacontext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarProvider } from "./helper/context/navbarcontext";
import { MyNextUIProvider } from "./helper/context/mynextuiprovider";


const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MyNextUIProvider>
          <UserProvider>
            <DataProvider>
              <QuestionProvider>
                <NavBarProvider>
                  <body className={`${inter.className} bodyStyles`} style={{ position: "relative" }}>
                    {/* Content */}
                    {children}

                    {/* Top Navbar */}
                    {/* <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000 }}>
                    <SiteNavBar />
                  </div> */}
                  </body>
                </NavBarProvider>
              </QuestionProvider>
            </DataProvider>
          </UserProvider>
        </MyNextUIProvider>
      </body>
    </html>
  );
}
