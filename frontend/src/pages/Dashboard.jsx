import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import NotForm from "../components/NotForm"
import {notlarGetir, reset} from "../features/data/dataSlice"
import Spinner from "../components/Spinner"
import Not from "../components/Not";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { kullanici } = useSelector((state) => state.auth);
  const { notlar, isYukleniyor, mesaj } = useSelector((state) => state.notlar);

  useEffect(() => {

   

    if (!kullanici) {
      navigate("/login");
      return;
    }

    dispatch(notlarGetir())

    return() => {
      dispatch(reset())
    }

  }, [kullanici, navigate, mesaj, dispatch]);

  if(isYukleniyor){
    <Spinner />
  }
  return (
    <>
    <section className="heading">
        <h1>Merhaba {kullanici && kullanici.kullaniciAd}</h1>
        <p>Not Ekle</p>
    </section>
    <NotForm />

    <section className="content">
      {notlar.length > 0 ? (
        <div className="notlar">
          {notlar.map((not) => (
            <Not key={not._id} not={not}/>
          ))}
        </div>
      ) : (
        <h3>Henüz not girmediniz</h3>
      )}
    </section>
  </>
  )
}

export default Dashboard