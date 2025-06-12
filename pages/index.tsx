"use client";
import Head from 'next/head';
import { motion } from 'framer-motion';
import About from '@/components/top/about';
import Curriculums from '@/components/top/curriculums';
import { GetStaticProps } from 'next';
import { CurriculumService } from '@/lib/services/CurriculumService';
import { PageDataService } from '@/lib/services/PageDataService';
import Header from '@/components/top/header';
import { IntroductionService } from '@/lib/services/IntroductionService';
import { Introduction } from '@/types/introduction';
import SignInButton from '@/components/LoginButton/SignInButton';

type Props = {
  pageNum:number;
  allIntroduction:Introduction[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allCurriculumid:string[] = await CurriculumService.getAllCurriculumId();
  const allChildId = await PageDataService.getChildPageIds();
  const pageNum = allCurriculumid.length + allChildId.length;
  const allIntroduction:Introduction[] = await IntroductionService.getAllIntroduction();
  return {
    props:{
      pageNum,
      allIntroduction
    },
  };
};

export default function Home({pageNum,allIntroduction}:Props) {
  return (
    <div className="min-h-screen text-gray-900 diagonal-bg">
      <Head>
        <title>【 HorizonAtlas 】RyukokuHorizon部員専用プログラミング学習サイト</title>
        <meta property="og:title" content="HorizonAtlas" />
        <meta name="description" content="HorizonAtlasは、RyukokuHorizonの学習カリキュラムをまとめた部員専用のサービスです。" />
        <meta name="keywords" content="ryukoku,龍谷,プログラミング部,Horizon,HorizonAtlas" />
        <meta property="og:description" content="HorizonAtlasは、RyukokuHorizonの学習カリキュラムをまとめた部員専用のサービスです。" />
        <meta property="og:image" content="https://ryukoku-horizon.github.io/horizon-atlas/home.png" />
        <meta property="og:type" content="website" />
        <meta name='twitter:title' content="HorizonAtlas" />
        <meta name='twitter:description' content="HorizonAtlasは、RyukokuHorizonの学習カリキュラムをまとめた部員専用のサービスです。" />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name="twitter:card" content="https://ryukoku-horizon.github.io/horizon-atlas/home.png" />
        <meta name="google-site-verification" content="SXCl4dT0J3G7YXvZ1rlN7iG2aq28aVfOj_xVkoLP4V0" />
        <link rel="icon" href="/horizon-atlas/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto py-16 text-center">
      <section className="bg-hero text-white flex flex-col justify-center items-center text-center h-[34rem]">
          <motion.h2 
            className="text-gray-800 text-6xl font-extrabold drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {["W", "e", "l", "c", "o", "m", "e", " ", "t", "o", " "].map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: index * 0.1 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              HorizonAtlas
            </motion.span>
          </motion.h2>

          <p className="text-lg mt-4 max-w-2xl">プログラミング部Horizonで使用する学習資料を簡単に閲覧、検索できます。</p>
          <div className="mt-8 flex justify-center">
            <SignInButton  />
          </div>
          <div className='mt-2 text-sm text-gray-50'>⚠️Horizonサーバーのメンバーアカウントのみログインできます</div>
        </section>
        <About />
        <Curriculums pageNum={pageNum} allIntroduction={allIntroduction} />
      </main>

      <footer className="bg-gray-200 text-gray-700 py-4 text-center">
        <p className="text-sm">&copy; 2025 Ryukoku Horizon</p>
      </footer>
    </div>
  );
}
