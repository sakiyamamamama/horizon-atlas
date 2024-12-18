import { GetStaticProps } from 'next';
import { getAllPosts, getSinglePost } from '@/lib/notionAPI';
import React from 'react'
import { PostMetaData } from '@/types/postMetaData';
import BackButton from '@/components/BackButton/BackButton';
import { MdBlock } from 'notion-to-md/build/types';
import MdBlockComponent from '@/components/mdBlocks/mdBlock';

type postPath = {
  params: { slug:string }
}

type Props = {
  metadata:PostMetaData
  mdBlocks:MdBlock[]
};

export const getStaticPaths = async() =>{
  const allPosts:PostMetaData[] = await getAllPosts();
  const paths:postPath[] = allPosts.map(({slug})=>{
    return { params: { slug: slug } };
  })
  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string; 
  const post = await getSinglePost(slug);
  return {
    props: {
      metadata:post.metadata,
      mdBlocks:post.mdBlocks
    },
    revalidate: 50, // 50秒間隔でISRを実行
  };
};

const Post =({ metadata, mdBlocks }: Props) => {
  console.log(mdBlocks);
  // console.log(post.mdBlocks[9].parent)
  // const handleCopy = async (code: string) => {
  //     await navigator.clipboard.writeText(code);
  //     alert('コードをコピーしました！');
  // };
  return (
    <section className='container lg;px-2 px-5 mx-auto mt-20'>
        <h2 className='w-full text-2xl font-medium'>{metadata.title}</h2>
        <div className='border-b-2 mt-2'></div>
        <span className='text-gray-500'>posted date at {metadata.date}</span>
        <br />
        {metadata.tags.map((tag:string,i:number)=>(
          <p className='text-white bg-sky-500 rounded-xl font-medium mt-2 px-2 inline-block mr-2' key={i}>
            {tag}
            </p>
        ))}
        <div className='mt-10 font-medium'>
          <div>
            {mdBlocks.map((mdBlock)=>(
              <MdBlockComponent mdBlock={mdBlock} />
            ))}
          </div>
          <BackButton />
        </div>
    </section>
  )
}

export default Post