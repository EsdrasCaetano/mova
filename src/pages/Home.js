


import React, { useEffect, useState } from "react";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";

import RenderDdi from '../components/RenderDdi'
import RenderAll from '../components/RenderAll'
import RenderPais from '../components/RenderPais'
import RenderIdioma from '../components/RenderIdioma'
import RenderRegiao from '../components/RenderRegiao'
import RenderCapital from '../components/RenderCapital'



const listLoc = [
  {id: 0, name: 'Selecione', value:'selecione'},
  {id: 1, name: 'Africa', value: 'africa'},
  {id: 2, name: 'Americas', value: 'americas'},
  {id: 3, name: 'Ásia', value: 'asia'},
  {id: 4, name: 'Europa', value: 'europe'},
  {id: 5, name: 'Oceania', value: 'oceania'},
  {id: 6, name: 'Polar', value: 'polar'},

];

const firstSelect = [
  {id: 0, name: 'selecione', value: 'selecione'},
  {id: 1, name: 'Região', value: 'region'},
  {id: 2, name: 'Capital', value: 'capital'},
  {id: 3, name: 'Idioma', value: 'lingua'},
  {id: 4, name: 'País', value: 'pais'},
  {id: 5, name: 'DDI', value: 'ddi'}
  
]



const Home = ({props}) => {
  const [data, setData] = useState([]);

  const [select, setSelect] = useState('');

  const [listCapital, setListCapital] = useState ([]);
  const [listRegioes, setListRegioes] = useState ([]);
  const [lang, setLang] = useState ([]);
  const [listPais, setListPais] = useState([])
  const [listCalcod, setListCalcod] = useState([])
  

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //let tempData = data;
  let [tempData, setTempData] = useState([]);
  
  useEffect( async () => {
    if (select !== 'selecione' && select !== '') {
      document.getElementById('render-all').style.display = 'none';
    } else {
      document.getElementById('render-all').style.display = 'block';
    }
    

}, [select])

  useEffect( () => {
    const url = 'https://restcountries.eu/rest/v2'
     axios.get(url).then(res => {
      setData(res.data)
      setTempData(res.data)
    })
    .catch(err => {
        console.log(err)
    });
}, [])

  //Get Regions
  useEffect( () => {
    let urlRegions = `https://restcountries.eu/rest/v2/region/${listRegioes}`
    axios.get(urlRegions)
    .then(res => {
      setTempData(res.data)
    }).catch(err => {
      console.log(err)
    });
  }, [listRegioes, select])

  //Get Capital
  useEffect( async () => {
    let urlCapital = `https://restcountries.eu/rest/v2/capital/${listCapital}`
    await axios.get(urlCapital)
    .then(res => {
      setTempData(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }, [listCapital, select])

  //Get Idioma
  useEffect(() => {
      let urlIdioma = `https://restcountries.eu/rest/v2/lang/${lang}`
      axios.get(urlIdioma)
      .then(res => {
          setTempData(res.data)
      })
  }, [lang, select])

  //Get Pais
  useEffect(() => {
      let urlPais = `https://restcountries.eu/rest/v2/name/${listPais}`
      axios.get(urlPais)
      .then(res => {
          setTempData(res.data)
          console.log(res.data)
      })
  }, [listPais, select])

  //Get DDI
  useEffect(() => {
      let ulrDdi = `https://restcountries.eu/rest/v2/callingcode/${listCalcod}`
      axios.get(ulrDdi)
      .then(res => {
          setTempData(res.data)
      })
  }, [listCalcod, select])



  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(tempData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = tempData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li 
          key={number}
          id={number}
          onClick={handleClick}
          className={ currentPage == number ? "active" : "page-item"}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });


  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };
  console.log(select)
  return (
    <>
       <div className="select-primario">

            <div className="select1">
            <h3>Filtrar por:</h3>
              <select 
              onChange={e => setSelect(e.target.value)}>
                {firstSelect.map((item) => (
                  <option value={item.value} >{item.name}</option>
                ))}
              </select>
            </div>
               <div>
            <select 
            id="selectRegion" 
            className={ select == 'region' ? "show" : "hide"}
            onChange={e => setListRegioes(e.target.value)}>
                {listLoc.map((item) => (
                    <option  value={item.value}>{item.name}</option>
                    ))}        
            </select>
                  </div>
            <select 
            id="selectCapital" 
            className={ select == 'capital' ? "show" : "hide"}
            onChange={e => setListCapital(e.target.value)}>
                {data.map((a) => (
                    <option value={a.value}>{a.capital}</option>
                    ))}        
            </select>

            <select 
            id="selectLanguage" 
            className={ select == 'lingua' ? "show" : "hide"}
            onChange={e => setLang(e.target.value)}>
                {data.map((a, index) => (
                    <option value={a.languages[0].iso639_1}  key={index} >{a.languages[0].name}</option>
                    ))}        
            </select>

            <select 
            id="selectCountry" 
            className={ select == 'pais' ? "show" : "hide"}
            onChange={e => setListPais(e.target.value)}>
                {data.map((a) => (
                    <option value={a.name}>{a.name}</option>
                ))}        
            </select>

            <select 
            className={ select == 'ddi' ? "show" : "hide"} 
            id="selectDDI" 
            onChange={e => setListCalcod(e.target.value)}>
                {data.map((a) => (
                    <option value={a.callingCodes}>{a.callingCodes}</option>
                ))}        
            </select>

        </div>

      <h1 className="titulo">Mova</h1> <br />
      
      <div className={ select == 'selecione' ? "show" : "hide"} id="render-all" >
        {RenderAll(currentItems)}
      </div>
      
      <div className={ select == 'capital' ? "show" : "hide"} id="render-capital" >
        {RenderCapital(currentItems)}
      </div>
      <div className={ select == 'region' ? "show" : "hide"}id="render-regiao" >
        {RenderRegiao(currentItems)}
      </div>
      <div className={ select == 'lingua' ? "show" : "hide"} id="render-idioma" >
        {RenderIdioma(currentItems)}
      </div>
      <div className={ select == 'pais' ? "show" : "hide"} id="render-pais" >
        {RenderPais(currentItems)}
      </div>
      <div  className={ select == 'ddi' ? "show" : "hide"} id="render-ddi hide">
        {RenderDdi(currentItems)}
      </div>
      

      <ul className="pageNumbers">
        <li className="sr-only">
          <button className="sr-only"
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
    </>
  );
}

export default Home;


