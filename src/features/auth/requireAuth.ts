import { redirect, type LoaderFunctionArgs } from "react-router";
import { useAuthStore } from "./useAuthStore";
import { useRedirectStore } from "./redirectStore";

export default function requireAuth({ url }: LoaderFunctionArgs) {
  const user = useAuthStore.getState().user;
  const redirectStore = useRedirectStore.getState();
  if (!user) {
    redirectStore.setRedirectTo(url.pathname);
    return redirect("/login");
  }
  return null;
}