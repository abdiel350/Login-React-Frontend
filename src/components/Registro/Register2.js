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

      // Validar que no haya campos vacios
      if( name.trim() === '' || 
          email.trim() === '' || 
          password.trim() === '') /*  || 
        confirmar.trim() === '' )*/ {
            toast.success('Todos los campos son obligatorios');
          return;
      }
    //debo validar el email  
  /*  function Validar(email){
      emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      //Se muestra un texto a modo de ejemplo, luego va a ser un icono
      if (emailRegex.test(campo.value)) {
        valido.innerText = "válido";
      } else {
        valido.innerText = "incorrecto";
      }
  
  }*/
   
      // Password minimo de 6 caracteres
        if(password.length < 6) {
          toast.success('El password debe ser de al menos 6 caracteres');
            return;
        }

         /*  // Los 2 passwords son iguales   pendiente con esto abdiel
           if(password !== confirmar) {
            toast.success('Los passwords no son iguales');
            return;
        }*/
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Registro exitoso");
      } else {
        setAuth(false);
        //toast.error(parseRes);
       // toast.success("Todos los campos son obligatorios");
      
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

       { /*
        <input
          type="password"
          name="password"
          value={confirmar}
          placeholder="Repite tu Password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        /> */}
       
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
