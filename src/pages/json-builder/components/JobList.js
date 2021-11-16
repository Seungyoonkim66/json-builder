import { Button, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import WorkIcon from '@material-ui/icons/Work';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import styled from "styled-components";
import JobCreator from './JobCreator';
import JobModifier from './JobModifier';



const StyledContainer = styled.div`
    .btns-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.1rem;
    }
    
    .jobs-container{
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        height: 48.7rem;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 1rem;
    }
    .job-add-btn{
        width: 100px;
    }
    .task-container{
        margin-bottom: .5rem;
        padding: 1rem;
        border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .job-row{
        overflow: auto;
        display: flex;
        flex-direction: row;
    }
    .job-card{
        width: 300px;
        padding: 1rem;
        margin-right: 1rem;
        background-color: rgba(0,0,0,.05);
        border-radius: 5px;
        height: 200px;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        &:hover{
            background-color: rgba(0,0,0,.09);
        }
        .job-card-header{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
        }
        .job-card-title{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 1rem;
        }
        .job-card-content{
            height: 100%;
            overflow-x: auto;
            overflow-y: auto;
        }
        .job-card-table-row{
            white-space: nowrap;
            font-size: smaller;
            width: 100%;
        }
        .row-border-top{
            border-top: 1.5px solid white;
            
        }
        .job-card-table-cell-name{
            border-right: 1.5px solid white;
            padding-right: .5rem;
            margin-right: .5rem;
            font-weight: bolder;
        
        }
        .job-card-table-cell-data{
            padding-left: .5rem;
            font-size: smaller;
            width: 200%;
        }
    }
`;

export default function JobList({ tasks, setTasks }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [openModifierModal, setOpenModifierModal] = React.useState(false);
    const [editedJob, setEditedJob] = React.useState('');
    const [taskIncludeEditedJob, setTaskIncludeEditedJob] = React.useState('');


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleOpenModifierModal = (job, task) => {
        setTaskIncludeEditedJob(task);
        setEditedJob(job);
        
        setOpenModifierModal(true);
    }

    const handleClickRemove = (i, task) => {
        var tempJobs = [...tasks];
        var targetTask = tasks.find(j => j.name === task);
        var targetTaskIndex = tempJobs.indexOf(targetTask);
        targetTask.jobs.splice(i, 1);
        tempJobs.splice(targetTaskIndex, 1);
        tempJobs.splice(targetTaskIndex, 0, targetTask);
        setTasks(tempJobs);
    }


    return (
        <StyledContainer>
            <div className='btns-container'>
                <h5>Job 목록</h5>
                <Button className="job-add-btn" variant="outlined" color="primary" aria-label="add" onClick={handleOpenModal}><AddIcon /></Button>
            </div>
            <JobCreator
                openModal={openModal}
                setOpenModal={setOpenModal}
                setTasks={setTasks}
                tasks={tasks}
            />
            <JobModifier 
                openModal={openModifierModal}
                setOpenModal={setOpenModifierModal}
                editedJob={editedJob}
                setEditedJob={setEditedJob}
                tasks={tasks}
                taskIncludeEditedJob={taskIncludeEditedJob}
                setTaskIncludeEditedJob={setTaskIncludeEditedJob}
            />

            <div className="jobs-container">
                {tasks.map((entry, taskIndex) => {
                    return (
                        <div key={taskIndex} className="task-container"> 
                            <h5>{entry.name}</h5>
                            <div className='job-row'>{entry.jobs.map((job, jobIndex) => {
                                const jobCardId = `${entry.name.replaceAll(' ', '')}-${jobIndex}`;
                                return (
                                    <div key={jobIndex} id={jobCardId}>
                                        <div className="job-card">
                                            <div className='job-card-header'>
                                                <div className='job-card-title'><Avatar><WorkIcon /></Avatar>&ensp; Job {jobIndex + 1}</div>
                                                <div>
                                                <Button color="primary" variant="outlined" className='job-card-remove-btn' onClick={() => handleClickRemove(jobIndex, entry.name)}><RemoveIcon /></Button>                                            
                                                <Button color="primary" variant="outlined" className='job-card-edit-btn' onClick={() => handleOpenModifierModal(job, entry)}><EditIcon /></Button>                                            
                                                </div>
                                            </div>
                                            <div className='job-card-content'>
                                                <table className='job-card-table'>
                                                    <tbody>
                                                        {Object.keys(job).map((k, i) => {
                                                                const rowKey = `${k}-${JSON.stringify(job[k])}-${i}`;
                                                                return (
                                                                    <tr className={i !== 0 ? 'job-card-table-row row-border-top' : 'job-card-table-row'} key={rowKey}>
                                                                        <td className="job-card-table-cell-name text-muted">{k}</td>
                                                                        <td className="job-card-table-cell-data">{JSON.stringify(job[k]).replaceAll("\"", "")}</td>
                                                                    </tr>
                                                                );
                                                            }
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </StyledContainer>
    );
}