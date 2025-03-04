import { CustomUser } from "@/global";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [allowed, setAllowed] = useState(false);
  const redirectUri =
  process.env.NEXT_PUBLIC_ROOT_PATH ?? "https://sakiyamamamama.github.io/horizon-atlas";
  const router = useRouter();

  const customUser = user! as CustomUser;

  useEffect(()=>{
    if(isAuthenticated){
      const checkGuild = async()=>{
        const isMember = customUser.profile
        console.log("roles",customUser.given_name);
        if (!isMember) {
          alert("Horizonメンバーアカウントのみログインできます");
          logout({ logoutParams: { returnTo: redirectUri } });
        } else {
          setAllowed(true);
        }
      }
      checkGuild();
    }
  },[isAuthenticated])

  useEffect(()=>{
    if(allowed){
      router.push("/posts")
    }
  },[allowed])

  return (
    <div className="">
        <button
        className="flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm transition duration-300 hover:bg-gray-100"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                redirect_uri: redirectUri,
                connection: "Discord-custom-auth",
                scope:"identify guilds",
              },
            })
                      
          }
        >
          <img src="/horizon-atlas/discord_logo.png" alt="discord" className="w-5 h-5 mr-2" />
          Discordでログイン
        </button>
    </div>
  );
}