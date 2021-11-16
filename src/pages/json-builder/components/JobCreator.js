import React from 'react';
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import { Tooltip, IconButton, Select, FormControl, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        margin: 0
    }
}));


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
    .job-input-label{
        font-size:.8rem;
        margin-bottom: 0;
        margin-top: .5rem;
    }
    .job-input{
        width: 100%;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        padding: .4rem;
    }
    .job-input-helper-text{
        font-size:.5rem;
        margin-left: .2rem;
        color: rgba(0,0,0,.4);
    }
    .create-btn{
        margin-top: 1.5rem;
    }
    .add-entry-btn-wrapper{
        width: 100%;
        margin-top: 1rem;
        display: inline-flex;
        justify-content: space-between;
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
  
`;

export default function JobCreator({ openModal, setOpenModal, setTasks, tasks }) {
    const classes = useStyles();
    const [currentTask, setCurrentTask] = React.useState('');

    var attributesLength = 0;

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleSelectCurrentTask = (e) => {
        setCurrentTask(e.target.value);
    }

    const handleClickAddEntry = () => {

        attributesLength += 1;

        $('#entry-container').append(
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

    const handleClickCreate = () => {

        var job = {};

        for (var i = 1; i <= attributesLength; i++) {
            const key = $(`#entry-key-${i}`).val();
            const value = $(`#entry-value-${i}`).val();

            job[key] = value;
        }

        console.log(job);


        var tempJobs = [...tasks];
        tempJobs.map((entry) => {
            if (entry.name === currentTask) {
                return entry.jobs.push(job);
            }
            return null;
        })
        setTasks(tempJobs);

        $('#entry-container').children().remove();
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
                    <h5 className="text-muted">Create Job</h5>
                    <label htmlFor="job-task" className="text-muted job-input-label">Task</label>
                    <FormControl id='job-task' variant="outlined" margin='dense' className={classes.formControl}>
                        <Select
                            labelId="current-task-select-label"
                            id="current-task-select"
                            value={currentTask}
                            onChange={handleSelectCurrentTask}
                        >
                            {tasks.map((task, i) => (
                                <MenuItem key={i} value={task.name}>{task.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className='add-entry-btn-wrapper'>
                        <div className="text-muted">Job Attributes</div>
                        <Button className='add-entry-btn' variant="outlined" color="primary" onClick={handleClickAddEntry}>+</Button>
                    </div>
                    <div className='entry-container' id='entry-container'></div>
                    <Button className="create-btn" fullWidth variant="contained" color="primary" onClick={handleClickCreate}>Job 생성</Button>
                </div>
            </div>
        </StyledContainer>
    );
}