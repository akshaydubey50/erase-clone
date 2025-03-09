import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { memo, useContext } from 'react'
import { Link, Save } from 'lucide-react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { TabsContext } from '@/app/_context/FileListContext'
const WorkSpaceHeader:React.FC =({onSave})=>{
  const {activeTab,setActiveTab,handleTabsChange}=useContext(TabsContext);
  return (
    <div className='p-3 border-b flex justify-between items-center'>
    <div className='flex gap-2 items-center'>
      <Image src={'/logo-1.png'}
        alt='logo'
        height={40}
        width={40} />
      <h2>File Name</h2>
    </div>
    <div className="">
    <Tabs defaultValue={activeTab} className='w-[400px]'>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="document" onClick={()=>handleTabsChange('document')}>Document</TabsTrigger>
        <TabsTrigger value="both" onClick={()=>handleTabsChange('both')}>Both</TabsTrigger>
        <TabsTrigger value="canvas" onClick={()=>handleTabsChange('canvas')}>Canvas</TabsTrigger>
      </TabsList>
      </Tabs>
    </div>
    <div className='flex items-center gap-4'>
      <Button className='h-8 text-[12px]
      gap-2 bg-yellow-500 hover:bg-yellow-600'
      onClick={onSave}
      > 
      <Save className='h-4 w-4' /> Save </Button>
      <Button className='h-8 text-[12px]
      gap-2 bg-blue-600 hover:bg-blue-700'>
        Share <Link className='h-4 w-4' /> </Button>
    </div>
  </div>
  )
}
export default  memo(WorkSpaceHeader)
