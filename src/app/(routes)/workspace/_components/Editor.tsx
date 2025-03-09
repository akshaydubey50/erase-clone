"use client";
import React, { memo, useEffect, useRef, } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

const Editor: React.FC<{
  onSaveTrigger: boolean;
  fileId: string;
  fileData: FILE;
}> = ({ onSaveTrigger, fileId, fileData }) => {
  const editorRef = useRef<EditorJS|null>(null);
  const updateDocument = useMutation(api.files.updateDocument);


  useEffect(() => {
    if (!fileData) return;
    initEditor();

    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (error) {
          console.error("Error destroying editor:", error);
        }
        editorRef.current = null;
      }
    };
  }, [fileData]);



  useEffect(() => {
    if (onSaveTrigger) {
      console.log("Saving triggered");
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  const initEditor = () => {
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: { placeholder: "Enter a Header" },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
        },
        paragraph: Paragraph,
        warning: Warning,
      },
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
      onReady: () => {
        editorRef.current = editor;
      },
    });

  };

  const onSaveDocument=()=>{
    if(editorRef.current)
    {
      editorRef.current.save().then((outputData) => {
        console.log('Article data: ', outputData);
        updateDocument({
          _id:fileId,
          document:JSON.stringify(outputData)
        }).then(resp=>{
          
            toast('Document Updated!')
          
        },(e)=>{
          toast("Server Error!")
        })
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
    }
  }
  return (
      <div id="editorjs" className="ml-20" />
  );
};

export default memo(Editor) ;
