import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import useFirebaseUser from "@/hooks/useFirebaseUser";
import useUserProfileStore from "@/stores/userProfile";
import { auth } from "@/lib/fireabase";
import { fetchUser } from "@/lib/fireStore";
import { useRouter } from "next/router";
import Loader from "@/components/loader/loader";
import LoginModal from "@/components/loginModal/loginModal";

function App({ Component, pageProps }:AppProps) {
  const {logout,loading:authLoading} = useFirebaseUser();
  const { userProfile,setUserProfile } = useUserProfileStore();
  const [loading,setLoading] = useState(false);
  const [dotCount,setDotCount] = useState(0);
  const router = useRouter()

  useEffect(()=>{
    const checkUser=async()=>{
      try{
        setLoading(true)
        if (auth.currentUser) {
          if(!userProfile){
            const user = await fetchUser(auth.currentUser.uid);
            if(user){
              setUserProfile(user)
            }else{
              logout();
              router.push("/")
              return;
            }
          }
          return;
        }
      }finally{
        setLoading(false)
      }
    }
    checkUser()
  },[auth.currentUser])

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4) 
    }, 1000)

    return () => clearInterval(interval) 
  }, [])

  if(!authLoading && !auth.currentUser){
    <>
      <LoginModal />
      <div className="opacity-0">
        <Component {...pageProps} /> 
      </div>
    </>
  }

  if(authLoading || loading){
    const dot = ".".repeat(dotCount)
    return (
      <div className="flex flex-col items-center gap-4 mt-5 flex-1 justify-center">
        <Loader size={80} />
        <p className="text-xl font-semibold text-gray-700">読み込み中{dot}</p>
        <div className="opacity-0">
          <Component {...pageProps} /> 
        </div>
      </div>
    )
  }

  return (
    <Component {...pageProps} />
  );
}

export default App;
