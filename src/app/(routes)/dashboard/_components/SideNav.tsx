import SideNavBottomSection from './SideNavBottomSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useConvex, useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { FileListContext ,FileListContextType} from '../../../_context/FileListContext'



export default function SideNav() {
  const {user}=useKindeBrowserClient();
  const createFile=useMutation(api.files.createFile);
  const [activeTeam,setActiveTeam]=useState<TEAM>();
  const convex=useConvex();
  const [totalFiles,setTotalFiles]=useState<number>();
  const {setFileList_}=useContext(FileListContext) as FileListContextType;

  useEffect(()=>{
    if(activeTeam){getFiles()}
  },[activeTeam])

  const onFileCreate=(fileName:string)=>{
    console.log(fileName)
    createFile({
      fileName:fileName,
      teamId:activeTeam?._id??"",
      createdBy:user?.email,
      archive:false,
      document:'',
      whiteBoard:''
    }).then(resp=>{
      if(resp)
      {
        getFiles();
        toast('File created successfully!')
      }
    },(e)=>{
      console.error(e)
      toast('Error while creating file')
    })
  }

  const getFiles=async()=>{
   try{
    const result=await convex.query(api.files.getFiles,{teamId:activeTeam?._id??""});
    console.log("result::::",result);
    setFileList_(result);
    setTotalFiles(result?.length)
   }
   catch(e){
    setFileList_([]);
    setTotalFiles(0)
    console.log(e)
   }
  }

  return (
    <div
    className=' h-screen 
    fixed w-72 borde-r border-[1px] p-6
    flex flex-col
    '
    >
      <div className='flex-1'>
      <SideNavTopSection user={user} 
      setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/>
      </div>
    
     <div>
      <SideNavBottomSection
      totalFiles={totalFiles}
      onFileCreate={onFileCreate}
      />
     </div>
    </div>
  )
}
