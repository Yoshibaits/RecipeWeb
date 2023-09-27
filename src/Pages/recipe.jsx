import { useEffect, useState } from "react";
import styled from 'styled-components';
import {useParams} from 'react-router-dom';


import React from 'react'

function recipe() {
  const [details, setDetails] = useState({});
  const [activeButton, setactiveButton] = useState("instructions");
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailedData = await data.json();
    setDetails(detailedData);
    console.log(detailedData);
  }

  useEffect(() => {
   fetchDetails();
  }, [params.name]);

  


  return (
    <DetailedWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} />
      </div>
      <Info>
        <Button className={activeButton === 'instructions' ? 'active' : ''} onClick={() => setactiveButton("instructions")}>Instructions</Button>
        <Button className={activeButton === 'ingredients' ? 'active' : ''}  onClick={() => setactiveButton("ingredients")}>Ingredients</Button>
        {activeButton === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions}}></h3>
          </div>
        )}
        {activeButton === 'ingredients' && (
          <ul>
            {details.extendedIngredients?.map((ingredient, index) => {
              if (index === 0){
                return null;
              }
              return(
                <li key={ingredient.id}>{ingredient.original}</li>
              )
            })};
          </ul>
        )}
        
      
      </Info>
    </DetailedWrapper>
  )
}


const DetailedWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    .active{
      background: linear-gradient(35deg, #494949, #313131);
      color: white;
    }

    h2{
      margin-bottom: 2rem;
    }

    li{
      font-size: 1.2rem;
      lin-height: 2.5rem;

    }
    ul{
      margin-top: 2rem;
    }
`
const Button = styled.div`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  

`

const Info = styled.div`
    margin-left: 10rem;
`



export default recipe;