"use client";
import React, {  useState } from "react";
import { TabsContext } from "@/app/_context/FileListContext";

function WorkSpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [activeTab, setActiveTab] = useState<string>("both");

    const handleTabsChange=(selectedTab:string)=>{
        setActiveTab(selectedTab)
    }
  return (
    <div>
      <TabsContext.Provider value={{ activeTab, setActiveTab,handleTabsChange }}>
          <div >{children}</div>
      </TabsContext.Provider>
    </div>
  );
}

export default WorkSpaceLayout;
