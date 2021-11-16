import { IconButton, Tooltip, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import styled from "styled-components";
import $ from 'jquery';

const StyledContainer = styled.div`
    display: ${props => props.openModal ? "flex" : "none"};
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
        width: 40rem;
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
    .entry-container{
        max-height: 400px;
        overflow-y: auto;
        .entry{
            display: flex;
            flex-direction: row;
        }
        label{
            font-size: .8em;
            color: rgba(0,0,0,.5);
            margin: 0;
        }
        input{
            border: 1px solid #c6c6c6;
            border-radius: 5px;
            padding: .5rem;
        }
    }  
    .edit-btn{
        margin-top: 1.5rem;
    }  
`;

export default function JobModifier({ openModal, setOpenModal, editedJob, setEditedJob, tasks, taskIncludeEditedJob, setTaskIncludeEditedJob }) {


    var attributesLength = Object.keys(editedJob).length;

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleClickAddEntry = () => {
        attributesLength += 1;
        $('#edit-entry-container').append(
            `<div className='entry' style="display:flex;flex-direction:row;">
                <div style="width:30%;">
                    <div><label htmlFor='entry-key-${attributesLength}'>Key</label></div>
                    <input id='entry-key-${attributesLength}' style="width:100%;"></input>
                </div>
                <div style="width:70%; margin-left: .5rem;">
                    <div><label htmlFor='entry-value-${attributesLength}'>Value</label></div>
                    <input id='entry-value-${attributesLength}' style="width:100%;"></input>
                </div>
            </div>`
        );
    }

    const handleClickEdit = () => {

        var jobAfterEdit = {};

        for (var i = 1; i <= attributesLength; i++) {
            const key = $(`#entry-key-${i}`).val();
            const value = $(`#entry-value-${i}`).val();

            jobAfterEdit[key] = value;
        }

        var tempTasks = [...tasks];
        var tempTask = tempTasks.find(task => task === taskIncludeEditedJob);
        var jobBeforeEdit = tempTask.jobs.find(j => j===editedJob);

        var indexOfJobBeforeEdit = tempTask.jobs.indexOf(jobBeforeEdit);

        tempTask.jobs[indexOfJobBeforeEdit] = jobAfterEdit;
        console.log(tasks);
        
        setEditedJob('');
        setTaskIncludeEditedJob('');
        $('#edit-entry-container').children().remove();
        attributesLength = 0;
        setOpenModal(false);
    }


    return (
        <StyledContainer openModal={openModal}>
            <div className="modal-window">
                <Tooltip title="Close" placement="left" className="close-btn">
                    <IconButton aria-label="delete" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
                <div className="modal-contents-container">
                    <h5 className="text-muted">Eiditing Job</h5>
                    <Button className='add-entry-btn' variant="outlined" color="primary" onClick={handleClickAddEntry}>+</Button>
                    <div className='entry-container' id='entry-container'>
                        {Object.keys(editedJob).map((attrKey, i) => {
                            return (
                                <div key={`${attrKey}-${i+1}`} className='entry' style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ width: '30%' }}>
                                        <div><label htmlFor={`entry-key-${i+1}`}>Key</label></div>
                                        <input id={`entry-key-${i+1}`} style={{ width: '100%' }} defaultValue={attrKey} readOnly={false}></input>
                                    </div>
                                    <div style={{ width: '70%', marginLeft: '.5rem' }}>
                                        <div><label htmlFor={`entry-value-${i+1}`}>Value</label></div>
                                        <input id={`entry-value-${i+1}`} style={{ width: '100%' }} defaultValue={JSON.stringify(editedJob[attrKey]).replaceAll("\"","")} readOnly={false}></input>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='entry-container' id='edit-entry-container'></div>
                    <Button className="edit-btn" fullWidth variant="contained" color="primary" onClick={handleClickEdit}>Job 수정 완료</Button>
                </div>
            </div>
        </StyledContainer>
    );
}