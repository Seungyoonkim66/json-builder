import React from 'react';
import styled from "styled-components";

const StyledContainer = styled.div`
   /* width: ${props => `${props.xs * 24}px` || '100%'} ; */
   height: 100%;
   padding: ${props => props.padding || 0};
`;

export default function Contents({ children, xs, padding }) {
    return (
        <StyledContainer padding={padding}>
          {children}
          
        </StyledContainer>
    );
}