import { useEffect, useState } from "react";

const Admioption = () => {
  const [isOnListM, setIsOnListM] = useState(() => {
    return localStorage.getItem("adListToken") === "true";
  });

  const [isOnForm, setIsOnForm] = useState(() => {
    return localStorage.getItem("adFormToken") === "true";
  });

  const handleSwitchToggle = () => {
    setIsOnListM((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem("adListToken", newValue ? "true" : "");
      return newValue;
    });
    window.location.reload();
  };

  const handleSwitchToggleForm = () => {
    setIsOnForm((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem("adFormToken", newValue ? "true" : "");
      return newValue;
    });
    window.location.reload();
  };

  useEffect(() => {
    if (!isOnListM) {
      localStorage.removeItem("adListToken");
    }

    if (!isOnForm) {
      localStorage.removeItem("adFormToken");
    }
  }, [isOnListM, isOnForm]);

  return (
    <div>
      <div className="card__admi">
        <div
          className="card-body d-flex flex-column gap-3 justify-content-center align-items-center "
          style={{ width: "100%", height: "100%" }}
        >
          <div className="d-flex gap-2">
            <div
              className={`switch ${isOnListM ? "on" : ""} `}
              onClick={handleSwitchToggle}
            ></div>
            <span>Listado de Peliculas</span>
          </div>

          <div className="d-flex gap-2 " style={{ paddingRight: "55px" }}>
            <div
              className={`switch ${isOnForm ? "on" : ""} `}
              onClick={handleSwitchToggleForm}
            ></div>
            <span>Formulario</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admioption;
