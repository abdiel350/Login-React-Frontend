import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//state para registrar un nuevo usuario 
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Registro exitoso");
      } else {
        setAuth(false);
        //toast.error(parseRes);
        toast.success("Todos los campos son obligatorios");
      
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
        <div className="hero-containerForm">
      <h1 className="mt-5 text-center">Registro en el sistema</h1>

      <form onSubmit={onSubmitForm}>

      <input
          type="text"
          name="name"
          value={name}
          placeholder="Nombre"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />

      <div className="campo-form">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
         </div>

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
       
        <button className="btn btn-success btn-block">Registrarme</button>
      </form>

      <div className="central">
      <Link to="/login">Volver a Iniciar Sesión</Link>
      </div>

      </div>
    </Fragment>
  );
};

export default Register;
