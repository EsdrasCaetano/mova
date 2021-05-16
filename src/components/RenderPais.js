import React, { useEffect, useState } from "react";

//import "./Home.css";

const RenderPais = (tempData) => {

    useEffect(() => {

    },[tempData])
    return (
    <div className="info-pais">
        {tempData.map((country, index) => {
            return(
                <div key={index} className="div-card">
                    <div className="img-card">
                    <img id='imagem' alt={country.name} className='ml-auto' src={country.flag} />
                        <div className="text-card">
                            <h1>País: {country.name}</h1>
                            <p>Capital: {country.capital}</p>
                            <p>Região: {country.region}</p>
                            <p>Sub-Região: {country.subregion}</p>
                            <p>Populacção: {country.population}</p>
                            <p>Idioma Nativo: {country.languages[0].nativeName}</p>
                            {/* 
                            <p>Paises vizinhos:{(country.borders).toString()}</p>
                            */}
                           
                        </div>
                    </div>
                
                    <div className="borders">
                        <h2>Países vizinhos</h2>    
                        <div className="borders-content">
                            {country.borders.map((item, index) => {
                                return (
                                    <div key={index} className="borders-item">
                                        <p>{item}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )  
        })}
        </div>
    )
}

export default RenderPais;
