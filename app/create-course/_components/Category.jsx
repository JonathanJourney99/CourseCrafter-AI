import Image from "next/image";
import React, { useContext } from "react";
import CategoryList from "@/app/_shared/CategoryList";
import { UserInputContext } from "@/app/_context/UserInput";

function Category() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select the Course Category</h2>
      <div className="grid grid-cols-3 gap-10 ">
        {CategoryList.map((item) => (
          <div
            key={item.id} // Use a unique property from the item object
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer ${
              userCourseInput?.category == item.name && "border-primary bg-blue-50"
            }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} width={80} height={50} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
