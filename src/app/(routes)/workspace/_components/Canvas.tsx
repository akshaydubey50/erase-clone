"use client";
import React from "react";
import { FILE } from '../../dashboard/_components/FileList'

const Canvas: React.FC<{
  onSaveTrigger: boolean;
  fileId: string;
  fileData: FILE;
}> = ({ onSaveTrigger, fileId, fileData }) => {
  return <div>Canvas</div>;
};

export default Canvas;
