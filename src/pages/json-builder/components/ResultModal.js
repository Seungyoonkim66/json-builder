import React from 'react';
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Tooltip, IconButton } from '@material-ui/core';


const StyledContainer = styled.div`
    display: ${props => props.shown ? "flex" : "none"};
    position: fixed;
    background-color: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 1000;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .modal-window{
        width: 60rem;
        height: 45rem;
        border-radius: 5px;
        background-color: white;
        overflow: auto;
        box-shadow: 0px 7px 10px;
        position: relative;
    }
    .close-btn{
        position: absolute;
        right: 0;
    }
    .modal-contents-container{
        margin: 1rem;
    }
    .result-header{
        display: flex;
        flex-direction: row;
        align-items: center;
        h5{
            margin: 0;
        }
    }
    .copy-btn{
        margin-left: 0.2rem;
    }
    .result-container{
        width: 100%;
        height: 39.5rem;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        resize: none;
        padding: .3rem;
        background-color: rgba(0,0,0,.03);
    }
`;



export default function ResultModal({ resultModalShown, setResultModalShown, resultJson }) {

    const handleClose = () => {
        setResultModalShown(false);
    }
    // const handleChangeResultJson = (e) => {
    //     console.log(e.target.value);
    // }
    const handleClickCopy = (resultJson) => {
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }

        const textarea = document.createElement("textarea");
        textarea.value = JSON.stringify(resultJson, undefined, 10);
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.display = "fixed";


        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("클립보드에 복사되었습니다.");
    }
    return (
        <StyledContainer shown={resultModalShown}>
            <div className="modal-window">
                <Tooltip title="Close" placement="left" className="close-btn">
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
                <div className="modal-contents-container">
                    <div className='result-header'>
                        <h5 className="text-muted">Result JSON</h5>
                        <Tooltip title="copy to clipboard" placement="right">
                            <IconButton className="copy-btn" variant="contained" color="primary" onClick={() => handleClickCopy(resultJson)}><FileCopyIcon /></IconButton>
                        </Tooltip>
                    </div>
                    <textarea className="result-container" value={JSON.stringify(resultJson, undefined, 10)}></textarea>
                </div>
            </div>
        </StyledContainer>
    );
}