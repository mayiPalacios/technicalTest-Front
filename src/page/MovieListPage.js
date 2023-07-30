import MovieList from "../components/movieList";
import Sidebar from "../components/sidebar";

const MovieListPage = () => {
  return (
    <div>
      <Sidebar component={MovieList} />
    </div>
  );
};

export default MovieListPage;
