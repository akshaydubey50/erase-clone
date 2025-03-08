import {v} from "convex/values";
import {mutation,query} from "./_generated/server"

export const createFile=mutation({
    args:{
        fileName:v.string(),
        teamId:v.string(),
        createdBy:v.string(),
        document:v.string(),
        whiteBoard:v.string(),
        archive:v.boolean()
    },
    handler:async(ctx,args)=>{
        const result=  await ctx.db.insert('files',args)
        return result
    }
})
export const getFiles=query({
    args:{teamId:v.string()},
    handler:async(ctx,args)=>{
        const result=await ctx.db.query("files").filter(q=>q.eq(q.field('teamId'),args.teamId)).collect()
        return result
    }
})
