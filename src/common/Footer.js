import React from 'react';
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    position: relative;
    bottom: 0;
`;

export default function Footer({ year, companyName }) {
    return (
        <StyledContainer className="container-fluid px-3">
            <div className="text-muted py-3 px-2 border-top">
                Copyright © {year} {companyName}. All rights reserved.
            </div>
        </StyledContainer>
    );
}