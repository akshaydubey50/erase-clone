import { FileListContext } from "@/app/_context/FileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface FILE {
  archive: boolean;
  createdBt: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

const FileList: React.FC = () => {
  const fileListContext = useContext(FileListContext);

  if (!fileListContext) {
    throw new Error(
      "FileListContext must be used within a FileListContext.Provider"
    );
  }

  const { fileList_ }: { fileList_: FILE[] } = fileListContext;
  const [fileList, setFileList] = useState<FILE[]>([]);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      console.log("fileList_::::::", fileList_);
      setFileList(fileList_);
    }
  }, [fileList_]);

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList.length > 0 ? (
              fileList.map((file) => (
                <tr
                  key={file._id}
                  className="odd:bg-gray-50 cursor-pointer"
                  onClick={() => router.push("/workspace/" + file._id)}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user?.picture && (
                      <Image
                        src={user.picture}
                        alt="User"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="gap-3">
                          <Archive className="h-4 w-4" /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center px-4 py-2 text-gray-500"
                >
                  No files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
