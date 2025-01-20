'use client'
import React, { createContext, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

export const UserCourseListContext = createContext();

function DashBoardLayout({ children }) {
  const [userCourseListlen, setUserCourseListlen] = useState(0); // Initialize as a number, not an array
  return (
    <UserCourseListContext.Provider value={[userCourseListlen, setUserCourseListlen]}>
      <div>
        <div className="md:w-64 hidden md:block">
          <SideBar />
        </div>

        <div className="md:ml-64">
          <Header />
          <div className="p-10">{children}</div>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashBoardLayout;
