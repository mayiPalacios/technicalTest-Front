import MovieForm from "../components/MovieForm";
import Sidebar from "../components/sidebar";

const MovieFormPage = () => {
  return (
    <div>
      <Sidebar component={MovieForm} />
    </div>
  );
};

export default MovieFormPage;
