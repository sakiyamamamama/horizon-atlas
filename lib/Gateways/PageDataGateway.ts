import { PageData } from "@/types/pageData";

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

export class PageDataGateway{
    getPageDataByPageId=async(pageId:string)=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataByPageId`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                pageId
            })
        });
        const pageDatas:PageData[] = await res.json();
        const sortedData = pageDatas.sort((a,b)=>a.order-b.order);
        return sortedData;
    }

    getPageDataByType=async(type:string)=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataByType`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                type
            })
        });
        const pageDatas:PageData[] = await res.json();
        return pageDatas;
    }

    getPageDataByTypeAndSlug=async(type:string,slug:string)=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataByTypeAndSlug`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                type,slug
            })
        });
        const pageDatas:PageData[] = await res.json();
        return pageDatas;
    }

    getPageDataBySlug=async(slug:string)=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getPageDataBySlug`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                slug
            })
        });
        const pageDatas:PageData[] = await res.json();
        return pageDatas;
    }
}