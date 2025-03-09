"use client";
import React,{useState,useEffect} from "react";
import { FILE } from "../../dashboard/_components/FileList";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

const Canvas: React.FC<{
  onSaveTrigger: boolean;
  fileId: string;
  fileData: FILE;
}> = ({ onSaveTrigger, fileId, fileData }) => {

  const [whiteBoardData,setWhiteBoardData]=useState();

  const updateWhiteboard=useMutation(api.files.updateWhiteboard)

  const saveWhiteboard=()=>{
    updateWhiteboard({
        _id:fileId,
        whiteboard:JSON.stringify(whiteBoardData)
    }).then(resp=>console.log(resp))
}

  useEffect(()=>{
    onSaveTrigger&&saveWhiteboard();
},[onSaveTrigger])

  return (
    <div style={{ height: "670px" }}>
    {fileData&& <Excalidraw 
     theme='light'
     initialData={{
         elements:fileData?.whiteboard&&JSON.parse(fileData?.whiteboard)
     }}
     onChange={(excalidrawElements, appState, files)=>
         setWhiteBoardData(excalidrawElements)}
     UIOptions={{
         canvasActions:{
             saveToActiveFile:false,
             loadScene:false,
             export:false,
             toggleTheme:false
 
         }
     }}
     >
         <MainMenu>
             <MainMenu.DefaultItems.ClearCanvas/>
             <MainMenu.DefaultItems.SaveAsImage/>
             <MainMenu.DefaultItems.ChangeCanvasBackground/>
         </MainMenu>
         <WelcomeScreen>
             <WelcomeScreen.Hints.MenuHint/>
             <WelcomeScreen.Hints.MenuHint/>
             <WelcomeScreen.Hints.ToolbarHint/>
             <WelcomeScreen.Center>
                 <WelcomeScreen.Center.MenuItemHelp/>
             </WelcomeScreen.Center>
         </WelcomeScreen>
         </Excalidraw>}
    </div>
  );
};

export default Canvas;
