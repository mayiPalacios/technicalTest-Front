import { useContext } from "react";
import { AuthContext } from "../context/SharedContext";

export default function useForm() {
  const { isOnForm } = useContext(AuthContext);
  return isOnForm;
}
