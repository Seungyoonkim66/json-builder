import React from 'react';
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.direction || "column"};
    padding: ${props => props.padding || '0'};
`;

export default function Body({ children, direction, padding }) {
    return(
        <StyledContainer direction={direction} padding={padding}>
            {children}
        </StyledContainer>
    );
}