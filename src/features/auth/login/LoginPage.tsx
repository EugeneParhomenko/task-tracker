import { useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { useRedirectStore } from "../redirectStore";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const authStore = useAuthStore();
  const redirectStore = useRedirectStore();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    authStore.login(userName);
    const redirectTo = redirectStore.redirectTo;
    redirectStore.clearRedirectTo();
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate("/");
    }
    
  };
  return (<>
    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
    <button onClick={handleLogin}>Login</button>
  </>);
}