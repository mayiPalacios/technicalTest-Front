import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { handleSubmit } from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import MyDatePicker from "./mydatePicker";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const MovieForm = () => {
  const [datee, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    budget: "",
    date: null,
    duration: "",
    secure__url_img: null,
  });
  const formSchema = Yup.object().shape({
    id: Yup.string().required('El campo "ID" es obligatorio.'),
    name: Yup.string().required('El campo "Nombre" es obligatorio.'),
    budget: Yup.string().required('El campo "Presupuesto" es obligatorio.'),
    date: Yup.date().nullable().required('El campo "Fecha" es obligatorio.'),
    duration: Yup.string().required('El campo "Duración" es obligatorio.'),
    secure__url_img: Yup.string()
      .nullable()
      .required('El campo "Imagen segura" es obligatorio.'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Obtenemos el archivo seleccionado (si es una lista, se toma el primero)
    setFormData({ ...formData, secure__url_img: selectedFile });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: datee,
    }));
  }, [datee]);

  const handleFormSubmit = async () => {
    console.log(formData.date);

    try {
      setFormData({ ...formData, id: uuidv4() });

      await formSchema.validate(formData, { abortEarly: false });
      setLoading(true);

      const form = new FormData();
      form.append("id", formData.id);
      form.append("name", formData.name);
      form.append("budget", formData.budget);
      form.append("date", formData.date);
      form.append("duration", formData.duration);
      form.append("img", formData.secure__url_img);
      const result = await handleSubmit(form);
      setLoading(false);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Movie submitted successfully.",
        }).then(() => {
          window.location.reload(); // Reload the page after clicking "OK"
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error instanceof Yup.ValidationError) {
        // Manejar los errores de validación
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors); // Actualiza el estado con los mensajes de error
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred while submitting the movie.",
        }).then(() => {
          window.location.reload(); // Reload the page after clicking "OK"
        });
      }
    }
  };

  const handleDateChange = (date) => {
    setDate(date);

    setFormData({ ...formData, id: uuidv4() });
  };

  return (
    <div>
      <div className="card__form">
        <div className="card-body">
          <h1 className="header">Agregar pelicula</h1>
          <FormWrapper>
            <FormField>
              <Label>Nombre:</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="alert__err">{errors.name}</span>}
            </FormField>

            <FormField>
              <Label>Imagen:</Label>
              <Input
                type="file"
                name="img"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
              {errors.secure__url_img && (
                <span className="alert__err">{errors.secure__url_img}</span>
              )}
            </FormField>

            <FormField>
              <MyDatePicker setData={handleDateChange} />
              {errors.date && <span className="alert__err">{errors.date}</span>}
            </FormField>

            <FormField>
              <Label>Duración (minutos):</Label>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
              {errors.duration && (
                <span className="alert__err">{errors.duration}</span>
              )}
            </FormField>

            <FormField>
              <Label>Presupuesto:</Label>
              <Input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
              {errors.budget && (
                <span className="alert__err">{errors.budget}</span>
              )}
            </FormField>
            <Button onClick={handleFormSubmit}>
              {loading ? (
                <Loader type="ThreeDots" color="#fff" height={18} width={40} />
              ) : (
                "Guardar"
              )}
            </Button>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
