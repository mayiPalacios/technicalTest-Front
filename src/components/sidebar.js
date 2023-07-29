import { useEffect, useState } from "react";
import { getOptions } from "../utils/fetchMethod";

const Sidebar = (props) => {
  const Component = props.component;
  const [option, setOption] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await getOptions();

      setOption(request.options);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {option &&
                option.map((op) => (
                  <li className="nav-item">
                    {op.name === "formulario" ? (
                      <a href="/form" className="nav-link align-middle px-0">
                        <i className="fs-4 bi bi-file-earmark-text"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          {op.name}
                        </span>
                      </a>
                    ) : (
                      ""
                    )}

                    {op.name === "administrar opciones" ? (
                      <a href="/admi" className="nav-link align-middle px-0">
                        <i className="fs-4 bi bi-gear"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          {op.name}
                        </span>
                      </a>
                    ) : (
                      ""
                    )}

                    {op.name === "listado de peliculas" ? (
                      <a href="/Movies" className="nav-link align-middle px-0">
                        <i className="fs-4 bi bi-film"></i>
                        <span className="ms-1 d-none d-sm-inline">
                          {op.name}
                        </span>
                      </a>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
            </ul>
            <hr />
          </div>
        </div>
        <div className="col py-3">
          <Component />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
