import React, { useState } from 'react';
import styled from "styled-components";
import $ from 'jquery';

const StyledContainer = styled.div`
    .custom-box{
        border: solid red;
    }
`;



export default function BoxButton({ canvasId, buttons, jsonId }) {
    var [level, setLevel] = useState(0);
    var [count, setCount] = useState(0);


    const addBox = (name, key, top) => {
        setCount(count += 1);
        $(`#${canvasId}`).append(`<div class="btn btn-primary mr-2" style="position: 
            relative; top:${top * 50}px;" id='${name}-${count}'>${name}</div>`);
        if (name === "branch") {
            setLevel(level += 1);
            $(`#${canvasId}`).append(`<div id='${name}-${count}-row'></div>`);
            $(`#${jsonId}`).append(`<div id='${name}-${count}-br'></div>`);
        }
        else{
            $(`#${jsonId}`).append(`<span id='${name}-${count}-json'>${name}-${count} </span>`);
        }
    
        // delete function insert    
        $(`#${name}-${count}`).on("click", function () {
            $(`#${name}-${count}`).remove();
            $(`#${name}-${count}-json`).remove();
            $(`#${name}-${count}-br`).remove();
            $(`#${name}-${count}-row`).remove();

            setCount(count -= 1);
            if (name === "branch") {
                setLevel(level -= 1);
            }
        });
    }

    return (
        <StyledContainer>
            {buttons.map((button, i) => {
                return <div key={i} className="btn btn-outline-secondary mr-2" onClick={() => addBox(button.name, i + 1, level)}>{button.name}</div>
            })}
        </StyledContainer>
    );
}