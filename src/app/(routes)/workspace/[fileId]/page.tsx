"use client";
import React, { useState, useEffect } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import { useConvex } from "convex/react";
import { api } from "../../../.././../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Editor from "../_components/Editor";
import Canvas from "../_components/Canvas";

export default function Workspace({ params }) {
  const [triggerSave, setTriggerSave] = useState<boolean>(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | unknown>();

  useEffect(() => {
    console.log("FILEID", params.fileId);
    params.fileId && getFileData();
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    setFileData(result);
  };
  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* Workspace Layout  */}
      <div
        className="grid grid-cols-1
      md:grid-cols-2"
      >
        {/* Document  */}
        <div className=" h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        {/* Whiteboard/canvas  */}
        <div className=" h-screen border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}
