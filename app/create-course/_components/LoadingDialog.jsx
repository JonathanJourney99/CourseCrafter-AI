import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle, // Import AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>AI is Working...</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-10">
              <Image src={'/project.gif'} width={100} height={100} unoptimized alt="AI Processing" />
              <div className="text-lg font-semibold">Please wait... AI is working on your course</div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
