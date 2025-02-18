import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from  'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {kullanici, isHata, isBasari, isYukleniyor, mesaj} = useSelector(state=>state.auth)

  const [formData, setFormData] = useState({
    kullaniciAd: "",
    email: "",
    parola: "",
    parolaKontrol: "",
  });
  const { kullaniciAd, email, parola, parolaKontrol } = formData;

  const onChange = (e) => {
    setFormData((onceki)=>({
      ...onceki,
      [e.target.name]:e.target.value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if(parola !== parolaKontrol){
      toast.error('Parolalar Eşleşmedi!')
    }else{
      const userData = {
        kullaniciAd, 
        email,
        parola
      }

      dispatch(register(userData))
    }
   
  };

  
  useEffect(()=>{
    if(isHata){
      toast.error(mesaj)
    }

    if(isBasari || kullanici){
      navigate('/')
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
          <FaUser /> Üyelik Oluştur
        </h1>

        <section className="form">
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="kullaniciAd"
              name="kullaniciAd"
              value={kullaniciAd}
              placeholder="Kullanıcı ad giriniz"
              onChange={onChange}
            />
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
            <input
              type="password"
              className="form-control"
              id="parolaKontrol"
              name="parolaKontrol"
              value={parolaKontrol}
              placeholder="Parola Tekrarını giriniz"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Üye Ol</button>
          </div>
          </form>
          </section>
       </section>
    </>
  )
}

export default Register