import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import candado from'../../img/candado.svg';
import mail from  '../../img/mail.svg';

//state para iniciar sesión
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

 //extraer usuario
  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

     //cuando el usuario quiere iniciar sesión
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
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
        toast.success("Conectado con éxito");
      } else {
        setAuth(false);
        toast.success("Credenciales incorrectas");
  
       
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
   <div className="hero-containerForm">
           <h1>Ingrese al Sistema</h1>   

      <form onSubmit={onSubmitForm}>
          
          <div className="campo-form">
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Introduzca email"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            < img
              src={mail}
              alt={mail}
              width="30px"
              height="20px"
            />
          </div>

          <div className="campo-form">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Introduzca Password"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            < img
              src={candado}
              alt={candado}
              width="30px"
              height="20px"
            />
          </div>
        

          <div className="boton">
        <button className="btn btn-success btn-block">Ingresar</button>    
        </div>
          
      </form>   

      <div className="centra">
        <Link  to="/register">Registrar</Link>
        </div>  
      </div>    

    </Fragment>
  );
};

export default Login;
