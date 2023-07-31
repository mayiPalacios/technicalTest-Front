import { useEffect, useState } from "react";
import {
  getMovieYears,
  getMovies,
  getMoviesByYear,
} from "../utils/fetchMethod";

let cases = "";
const MovieList = () => {
  const [offset, setOffset] = useState(0);
  const [movies, setMovies] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const limit = 3;

  useEffect(() => {
    const fetchMovies = async () => {
      const reqYear = await getMovieYears();

      setYears(reqYear.years);
      let response = undefined;
      if (selectedYear === "") {
        cases = "";
      }
      switch (cases) {
        case "":
          response = await getMovies(limit, offset);
          if (response) {
            setMovies(response.movies);
            setTotalItems(response.total);
          }
          break;

        case "year":
          response = await getMoviesByYear(selectedYear, limit, offset);
          setMovies(response.movies);
          setTotalItems(response.total);
          break;
        default:
          response = await getMovies(limit, offset);
          if (response) {
            setMovies(response.movies);
            setTotalItems(response.total);
          }
          break;
      }
    };
    fetchMovies();
  }, [offset, selectedYear]);

  const getCaseYear = async () => {
    cases = "year";
  };

  const handlePageClick = (newOffset) => {
    if (newOffset < 0) {
      return;
    }

    if (newOffset >= totalItems) {
      return;
    }
    setOffset(newOffset);
  };

  const getPageNumbers = () => {
    const pageCount = Math.ceil(totalItems / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const visiblePages = 3; // Cantidad de números de página visibles

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

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString(); // Formatear la fecha en formato local
  };

  return (
    <div className="container__movies" style={{ margin: "4vw 3vw 2vw" }}>
      <div
        className="d-flex  justify-content-center gap-4 "
        style={{ marginRight: "142px" }}
      >
        <div>
          <select
            className="form-select selt__btn mb-4 select__year"
            aria-label="Default select example"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              getCaseYear();
            }}
          >
            <option selected value="">
              Release Year
            </option>
            {years &&
              years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3 ">
          <RenderPageNumber />
        </div>
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
                    color: "#0d6efd",
                  }}
                >
                  <a href="#">
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
                        href="#"
                      >
                        {movie.name}
                      </a>
                    </h5>
                    <div className="top d-flex gap-2">
                      <span>Duration:{movie.duration}</span>
                      <span className="date">
                        {formatDateString(movie.date)}
                      </span>
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
