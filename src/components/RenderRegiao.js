import React, { useEffect, useState } from "react";

//import "./Home.css";

const RenderRegiao = (tempData) => {

    useEffect(() => {

    },[tempData])
    return (
    <div className="grid">
        {tempData.map((country, index) => {
            return(
                <div key={index} className="div-card">
                    <img id='imagem' alt={country.name} className='ml-auto' src={country.flag} />
                </div>
                )  
        })}
        </div>
    )
}

export default RenderRegiao;