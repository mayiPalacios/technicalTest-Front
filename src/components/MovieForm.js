import React, { useState } from "react";
import styled from "styled-components";
import { handleSubmit } from "../api/Api";
import { v4 as uuidv4 } from "uuid";
import MyDatePicker from "./mydatePicker";
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
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    budget: "",
    date: null,
    duration: "",
    secure__url_img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Obtenemos el archivo seleccionado (si es una lista, se toma el primero)
    setFormData({ ...formData, secure__url_img: selectedFile });
  };

  const handleFormSubmit = async () => {
    try {
      setFormData({ ...formData, id: uuidv4() });
      setFormData({ ...formData, date: datee });

      const form = new FormData();
      form.append("id", formData.id);
      form.append("name", formData.name);
      form.append("budget", formData.budget);
      form.append("date", formData.date);
      form.append("duration", formData.duration);
      form.append("img", formData.secure__url_img);
      await handleSubmit(form);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setFormData({ ...formData, date: datee });
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
            </FormField>

            <FormField>
              <Label>Imagen:</Label>
              <Input
                type="file"
                name="img"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </FormField>

            <FormField>
              <MyDatePicker setData={handleDateChange} />
            </FormField>

            <FormField>
              <Label>Duración (minutos):</Label>
              <Input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label>Presupuesto:</Label>
              <Input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </FormField>
            <Button onClick={handleFormSubmit}>Guardar</Button>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
