import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/constants/supabaseEnvironmental";

type Column="*" | "curriculumId" | "blockId" | "parentId" | "data" | "type" | "pageId" | "order"

export class PageDataGateway{
    // static getPageDataByPageId=async(pageId:string)=>{
    //     const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataByPageId`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    //         },
    //         body:JSON.stringify({
    //             pageId
    //         })
    //     });
    //     const pageDatas:PageData[] = await res.json();
    //     const sortedData = pageDatas.sort((a,b)=>a.order-b.order);
    //     return sortedData;
    // }

    // static getPageDataByType=async(type:string)=>{
    //     const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataByType`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    //         },
    //         body:JSON.stringify({
    //             type
    //         })
    //     });
    //     const pageDatas:PageData[] = await res.json();
    //     return pageDatas;
    // }

    static get=async(select:Column | Column[],match?:{[key:string]:string})=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataWithSelect`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                match,
                select:Array.isArray(select) ? select.join(",") : select
            })
        })
        if(!res.ok){
            const text = await res.text()
            console.error("erorr:",text)
            throw new Error("error at PageData")
        }
        const data = await res.json()
        return data;
    }
}