import React from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const StyledContainer = styled.div`
    padding : ${props => props.padding || 0};
    margin: ${props => props.margin || 0};
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.alignItems || "flex-start"};
    justify-content: ${props => props.justifyContent || "flex-start"};
    width: ${props => `${props.xs * 24}px` || "100%"};
    border-right: ${props => props.border || "1.5px solid rgba(0,0,0,.05)"};
    a {
        color: inherit;
        text-decoration: none;
    }
    .list-item{
        width: 100%;
        &:hover{
            background-color: rgba(0,0,0,.02);
        }
    }
    .row{
        display: flex;
    }
    .icon{
        align-self: center;
        color: rgba(0,0,0,.5);
    }
    .menu-desc{
        font-size: smaller;
    }
    
`;

const activeStyle = {
    backgroundColor: "rgba(0,0,0,.05)",
}

export default function NavBar({ padding, alignItems, justifyContent, xs, margin, border, menus }) {
    return (
        <StyledContainer
            margin={margin}
            padding={padding}
            alignItems={alignItems}
            justifyContent={justifyContent}
            xs={xs}
            border={border}
        >
            {menus.map((menu, i) => {
                if (menu.name !== "root") {
                    return (
                        <NavLink activeStyle={activeStyle} className="py-2 px-4 text-uppercase border-bottom list-item" to={menu.link} key={i}>
                            <div className="row">
                                <div className="icon mr-4 ml-2">{menu.icon}</div>
                                <div className="my-1">
                                    <span className="font-weight-bold">{menu.name}<br/></span>
                                    <span className="font-weight-light menu-desc">{menu.desc}</span>
                                </div>
                            </div>
                        </NavLink>
                    );
                }
                return null;
            })}
        </StyledContainer>
    );
}