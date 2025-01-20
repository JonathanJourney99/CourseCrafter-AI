"use client"
import React, { useState } from 'react'; // Group React imports together
import Header from '../dashboard/_components/Header';
import { UserInputContext } from '../_context/UserInput';

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]); // State for context

  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <div>
        <Header />
        {children}
      </div>
    </UserInputContext.Provider>
  );
}

export default CreateCourseLayout;
