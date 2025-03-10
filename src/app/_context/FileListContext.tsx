import { createContext } from "react";
import { FILE } from "../(routes)/dashboard/_components/FileList";


export interface FileListContextType {
  fileList_: FILE[];
  setFileList_: (fileList_: FILE[]) => void;
}


export interface TabsContextType {
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
    handleTabsChange:(selectedTab:string)=>void;
}

export const FileListContext=createContext<FileListContextType|undefined>(undefined);
export const TabsContext=createContext<TabsContextType|undefined>(undefined);