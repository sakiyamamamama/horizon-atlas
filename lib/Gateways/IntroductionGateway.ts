import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/constants/supabaseEnvironmental";

type data ={
    id:number;
    title:string;
    description:string;
    pageId:string;
}

export class IntroductionGateway{
    static getAllIntroduction=async()=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getAllIntroduction`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
        })
        const data:data[] = await res.json()
        return data;
    }
    static getIntroduction=async(pageId:string)=>{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/getIntroduction`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                pageId
            }),
        })
        const data:data[] = await res.json()
        return data;
    }
}
