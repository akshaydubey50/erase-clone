"use client";
import React, { useState, useEffect, memo } from "react";
import { FILE } from "../../dashboard/_components/FileList";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

const Canvas: React.FC<{
  onSaveTrigger: boolean;
  fileId: string;
  fileData: FILE;
}> = ({ onSaveTrigger, fileId, fileData }) => {
  const [whiteBoardData, setWhiteBoardData] = useState();

  const UIOptions = {
    canvasActions: {
      dockedSidebarBreakpoint: 200,
      saveToActiveFile: true,
      loadScene: true, 
    },
  };

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((resp) => console.log(resp));
  };

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);

  return (
    <div style={{ height: "670px" }}>
      {fileData && (
        <Excalidraw
          onChange={(excalidrawElements) => {
            console.log(excalidrawElements);
            setWhiteBoardData(excalidrawElements);
          }}
          UIOptions={UIOptions}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo />
            <WelcomeScreen.Center.Heading>
              Welcome Screen Heading!
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLink href="https://github.com/excalidraw/excalidraw">
                Excalidraw GitHub
              </WelcomeScreen.Center.MenuItemLink>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default memo(Canvas);
