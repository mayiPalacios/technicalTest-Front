import MovieForm from "../components/MovieForm";
import Sidebar from "../components/sidebar";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

const MovieFormPage = () => {
  const isOnForm = useForm();
  const navigate = useNavigate();

  if (isOnForm) {
    navigate("/admi");
  }

  return <div>{isOnForm ? "" : <Sidebar component={MovieForm} />}</div>;
};

export default MovieFormPage;
