"use client";
import React, { useState, useEffect, useContext } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Editor from "../_components/Editor";
import Canvas from "../_components/Canvas";
import { TabsContext } from "@/app/_context/FileListContext";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function Workspace({ params }: { params: { fileId?: string } }) {
  const [triggerSave, setTriggerSave] = useState<boolean>(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | null>(null);
  
  const tabsContext = useContext(TabsContext);

  if (!tabsContext) {
    throw new Error("WorkSpaceHeader must be used within a TabsContext.Provider");
  }
  
  const { activeTab } = tabsContext;
  

  useEffect(() => {
    if (params.fileId) {
      getFileData(params.fileId);
    }
  }, [params.fileId]);

  const getFileData = async (fileId: string) => {
    try {
      const result = await convex.query(api.files.getFileById, { _id: fileId as Id<"files">});
      setFileData(result);
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };

  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {activeTab === "document" && (
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params.fileId??""}
            fileData={fileData}
          />
        </div>
      )}
      {activeTab === "canvas" && (
        <div className="h-screen">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId??""}
            fileData={fileData}
          />
        </div>
      )}
      {activeTab === "both" && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-screen">
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId??""}
              fileData={fileData}
            />
          </div>
          <div className="h-screen border-l">
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={params.fileId??""}
              fileData={fileData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
