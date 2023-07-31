import MovieList from "../components/movieList";
import Sidebar from "../components/sidebar";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MovieListPage = () => {
  const isOnListM = useAuth();
  const navigate = useNavigate();

  if (isOnListM) {
    navigate("/admi");
  }

  return (
    <div>
      <Sidebar component={MovieList} />
    </div>
  );
};

export default MovieListPage;
