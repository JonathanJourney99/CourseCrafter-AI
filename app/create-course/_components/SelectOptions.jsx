import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserInputContext } from "@/app/_context/UserInput";

function SelectOptions() {
      const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  
      const handleInputChange= (fieldname, value)=>{
          setUserCourseInput(prev=>({
              ...prev,
              [fieldname]:value
          }))
      }

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        {/* Difficulty Level */}
        <div>
          <label className="text-sm">🎓Difficulty Level</label>
          <Select defaultValue={userCourseInput?.level} onValueChange={(value)=>handleInputChange('level',value)}>
            <SelectTrigger> 
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="b" value="Beginner">Beginner</SelectItem>
              <SelectItem key="i" value="Intermediate">Intermediate</SelectItem>
              <SelectItem key="a" value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label className="text-sm">⏰Course Duration</label>
          <Select defaultValue={userCourseInput?.duration} onValueChange={(value)=>handleInputChange('duration',value)}
            >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger> 
            <SelectContent>
              <SelectItem key="1" value="1">1 Hour</SelectItem>
              <SelectItem key="2" value="2">2 Hours</SelectItem>
              <SelectItem key="3" value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div>
          <label className="text-sm">🎥Add Video</label>
          <Select defaultValue={userCourseInput?.displayVideo} onValueChange={(value)=>handleInputChange('displayVideo',value)}
            >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="yes" value="yes">Yes</SelectItem>
              <SelectItem key="no" value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div>
          <label className="text-sm">📖Number of Chapters</label>
          <input
            type="number"
            className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Enter number of chapters"
            defaultValue={userCourseInput?.NoOfChapters}
            onChange={(event)=>handleInputChange('NoOfChapters',event.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOptions;
