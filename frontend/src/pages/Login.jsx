import React, { useState, useEffect } from "react";
import { FaUserCheck } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from  'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {kullanici, isHata, isBasari, isYukleniyor, mesaj} = useSelector(state=>state.auth)

  const [formData, setFormData] = useState({
    email: "",
    parola: "",
  });
  const { email, parola } = formData;



  const onChange = (e) => {
    setFormData((onceki) => ({
      ...onceki,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      parola
    }

    dispatch(login(userData))
  };
  
  useEffect(()=>{

    if(isHata){
      toast.error(mesaj)
    }

    if(isBasari || kullanici){
      navigate("/")
    }

    dispatch(reset())

  },[kullanici, isHata, isBasari, mesaj, navigate, dispatch])

  if(isYukleniyor){
    <Spinner />
  }
  return (
    <>
    <section className="heading">
      <h1>
        <FaUserCheck /> Giriş Yap
      </h1>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Email giriniz"
            onChange={onChange}
          />
          <input
            type="password"
            className="form-control"
            id="parola"
            name="parola"
            value={parola}
            placeholder="Parola giriniz"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Giriş Yap
          </button>
        </div>
      </form>
    </section>
  </>
  )
}

export default Login