import { UserInputContext } from '@/app/_context/UserInput';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

function TopicDescription() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    
    const handleInputChange= (fieldname, value)=>{
        setUserCourseInput(prev=>({
            ...prev,
            [fieldname]:value
        }))
    }
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Input Topic */}
            <div className='mt-5'>
                <label>
                    💡Write a topic for which you want to generate a Course(eg:, Python, Yoga, DSA, etc.....):
                </label>
                <Input placeholder={'Enater a Topic...'}
                className='h-14 text-xl'
                defaultValue={userCourseInput?.topic}
                onChange={(e)=>handleInputChange('topic',e.target.value)}/>
            </div>
            <div className='mt-5'>
                <label>
                    📝Tell us more about the topic you want to learn in depth..
                </label>
                <Textarea placeholder="Course Description"
                className='h-24 text-xl'
                defaultValue={userCourseInput?.description}
                onChange={(e)=>handleInputChange('description',e.target.value)}/>
            </div>
        {/* Text Area */}
    </div>
  )
}

export default TopicDescription