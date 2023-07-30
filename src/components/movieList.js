import { useEffect, useState } from "react";
import { getMovies } from "../utils/fetchMethod";

const MovieList = () => {
  const [offset, setOffset] = useState(0);
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 3;

  useEffect(() => {
    const axiosRegisters = async () => {
      const response = await getMovies(limit, offset);

      if (response) {
        setMovies(response.movies);
        setTotalItems(response.total);
      }
    };
    axiosRegisters();
  }, [offset]);

  const getPageNumbers = () => {
    const pageCount = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const visiblePages = 5; // Cantidad de números de página visibles

    let startPage = currentPage - Math.floor(visiblePages / 2);
    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + visiblePages - 1;
    if (endPage > pageCount) {
      endPage = pageCount;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handlePageClick = (newOffset) => {
    if (newOffset < 0) {
      return;
    }

    if (newOffset > totalItems) {
      return;
    }
    setOffset(newOffset);
  };

  const RenderPageNumber = () => {
    const pageNumbers = getPageNumbers();

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => handlePageClick(offset - limit)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li className="page-item" key={pageNumber}>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageClick((pageNumber - 1) * limit)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => handlePageClick(offset + limit)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container__movies" style={{ margin: "4vw 3vw 2vw" }}>
      <div className="mb-3 d-flex justify-content-center">
        <RenderPageNumber />
      </div>

      <section>
        <div className="row justify-content-center d-flex gap-4">
          {movies &&
            movies.map((movie) => (
              <div className="col-6 col-md-3 mb-3">
                <div
                  className="card mx-1 h-25"
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "#e4d804",
                  }}
                >
                  <a href="*">
                    <img
                      style={{ height: "52vh" }}
                      src={movie.secure__url_img}
                      className="card-img-top"
                      alt="..."
                    />
                  </a>
                  <div className="card-body">
                    <h5 className="title">
                      <a
                        style={{ textDecoration: "none", color: "#fff" }}
                        href="movie-details.html"
                      >
                        {movie.name}
                      </a>
                    </h5>
                    <div className="top d-flex gap-2">
                      <span>Duration:{movie.duration}</span>
                      <span className="date">{movie.date}</span>
                    </div>
                    <span>budget:{movie.budget}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
export default MovieList;
