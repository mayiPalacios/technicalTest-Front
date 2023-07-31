import { useContext } from "react";
import { AuthContext } from "../context/SharedContext";

export default function useAuth() {
  const { isOnListM } = useContext(AuthContext);
  return isOnListM;
}
