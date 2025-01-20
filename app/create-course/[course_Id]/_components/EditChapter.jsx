import React, { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditChapter({ course, index, refreshData }) {
  const Chapters = course?.courseOutput?.course?.chapters;

  const [name, setName] = useState(Chapters?.[index]?.chapterName || "");
  const [description, setDescription] = useState(
    Chapters?.[index]?.description || ""
  );

  useEffect(() => {
    if (Chapters?.[index]) {
      setName(Chapters[index].chapterName);
      setDescription(Chapters[index].description);
    }
  }, [course, index, Chapters]);

  const onUpdateHandler = async () => {
    const updatedCourse = { ...course };
    updatedCourse.courseOutput.course.chapters[index].chapterName = name;
    updatedCourse.courseOutput.course.chapters[index].description = description;

    const result = await db
      .update(CourseList)
      .set({ courseOutput: updatedCourse?.courseOutput })
      .where(eq(CourseList?.id, updatedCourse?.id))
      .returning({ id: CourseList.id });

    console.log(result);
    refreshData(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div>
              <div className="mt-3">
                <label>Course Title</label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <Textarea
                  className="h-40"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <div>
              <Button onClick={onUpdateHandler}>Update</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapter;
