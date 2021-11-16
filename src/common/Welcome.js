import React from 'react';
import styled from "styled-components";
import bg from './resources/original.jpg';

const StyledContainer = styled.div`
   .jumbo{
       background-image: url("https://cdn.pixabay.com/photo/2021/11/06/16/11/greece-6773682_1280.jpg");
       background-size: 100%;
       .desc{
           width: 800px;
       }
   }
`;

export default function Welcome({ title, desc }) {
    return (
        <StyledContainer>
            <div className="jumbo p-5 text-white rounded border m-4">
                <div className="container-fluid py-5">
                    <h1 className="font-weight-bold">{title}</h1>
                    <p className="desc">{desc}</p>
                </div>
            </div>
        </StyledContainer>
    );
}