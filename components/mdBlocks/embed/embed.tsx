import Loader from '@/components/loader/loader';
import { Parent } from '@/types/Parent';
import { MdBlock } from 'notion-to-md/build/types';
import React,{ useEffect, useState,useRef } from 'react'

type Props = {
    mdBlock: MdBlock;
    depth: number;
};

type IframeData={
    title:string;
    html:string;
}

type EmbedData ={
    parent:Parent[];
    url:string;
    canEmbed:boolean;
    embedData?:IframeData;
} 

function EmbedBlock(props: Props) {
    const {mdBlock} = props;
    const [appHeight,setAppHeight] = useState("500px");
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const data:EmbedData = JSON.parse(mdBlock.parent)
    const [sLoad,setSLoad] = useState(false)

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.height) {
                setAppHeight(`${event.data.height}px`);
            }
        };
        try{
            setSLoad(true)
            window.addEventListener("message", handleMessage);
            return () => window.removeEventListener("message", handleMessage);
        }finally{
            setSLoad(false)
        }
      }, []);

    return (<div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} className='mx-1.5 my-1.5' id={mdBlock.blockId}>
        {sLoad && <Loader size={60} />}
        {!sLoad && <>
            {data.canEmbed && <iframe src={data.url} ref={iframeRef}
            style={{
                width: "100%",
                height: appHeight,
                border: "none",
                overflow: "hidden"
                }}
            allowFullScreen />}
            {!data.canEmbed && data.embedData && data.embedData.html && <div
                dangerouslySetInnerHTML={{ __html:  data.embedData.html }}
            />}
        </>}
    </div>)
}
export default EmbedBlock;