import React from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPaginate from "react-paginate";
//import queryString from 'query-string';
//import {useHistory} from 'react-dom'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {

  const [image, setImage] = useState("");
  const clientId = "3Z85t9vwwMhnErqwt6mM2oJnDxgiTSMyRMSdcqVamV8";
  const [result, setResult] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const imagesPerPage = 5;
  const pagesVisited = pageNumber * imagesPerPage;
  
  const pageCount = Math.ceil(result.length / imagesPerPage);

const changePage = ({ selected }) => {
    setPageNumber(selected);
 };
  const handleChange = (event) => {
    setImage(event.target.value);
  };

  
    
  const handleSubmit = () => {
    // let history = useHistory();
    // let queries = queryString.parse(image);
    // console.log(queries);
    // history.pushState(queries);
    alert(image);
    console.log(image);
    const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId;
    axios.get(url).then((response) => {
      console.log(response);
      setResult(response.data.results);
    });
    
  };

  return (
    <div className="app">
    <div className="heading">
      <h1>Image Search Project.</h1>
    </div>
    
    <div className="input">
      <input onChange={handleChange} type="text" name="image"   placeholder="Search for images"/>
    </div>
     <Router>      
       <Link to={image} >
       <button onClick={handleSubmit} type="submit">Search</button>
       </Link>
     </Router>

    <div className="result">
    
    {result
    .slice(pagesVisited, pagesVisited + imagesPerPage)
    .map((image) => (
      <>
      <div className="card">
      <LazyLoadImage
                key={image}
                src={image.urls.thumb}
                alt={`Random image ${image.user.name}`}
      />
      
      </div>
    
      </>
      ))}
      </div>
      <br></br>
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

    </div>
  );
}
export default App;