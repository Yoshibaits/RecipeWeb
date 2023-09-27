import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css'
import {Link} from 'react-router-dom'

function vegcarousel() {

    const [veggies, setVeggies]= useState([]);

    useEffect(()=>{
        getVeggies();
    },[])

    const getVeggies = async () => {
        const check = localStorage.getItem('veggiestorage');

        if(check){
            setVeggies(JSON.parse(check));
        }
        else{
        
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`);
        const info = await api.json();
        localStorage.setItem('veggiestorage', JSON.stringify(info.recipes));
        console.log(info.recipes);
        setVeggies(info.recipes);
        }


        
    }

  return (
    <div>
            <Wrapper>
                    <h3>Veggie Picks</h3>
                    <Splide options={{perPage:3, pagination: false, drag: 'free', gap:'5rem',}}>
                    {veggies.map((food)=>{
                        return(
                            <SplideSlide key={food.id}>
                                <Card >
                                    <Link to={'/recipe/' + food.id}>
                                        <p>{food.title}</p>
                                        <img src={food.image} alt={food.image}></img>
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                    </Splide>
            </Wrapper>       
    </div>
  )
}



const Wrapper = styled.div`
    margin: 4rem 0rem;
    
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 3rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    p{
        position: absolute;
        z-index: 10;
        lef: 50%;
        bottom: 0%;
        transform: translate (-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;


export default vegcarousel;