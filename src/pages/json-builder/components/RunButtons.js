import React from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        marginBottom: theme.spacing(1),
      },
  },
}));



const StyledContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    .taskset-upload{
        display: none;
    }
    .taskset-upload-btn{
        margin: 0;
    }
`;

export default function RunButtons({ 
    setModelNames, setResultModalShown, setTaskSetName, setContext, setTasks,
    taskSetName, modelNames, context, tasks, 
    setResultJson
 }) {
    const classes = useStyles();

    const handleUploadFile = (e) => {
        var file = e.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = () => {
            const newJson = JSON.parse(fileReader.result);

            var uploadedTaskName = newJson['task_name'];
            var uploadedModelNames = newJson['model_list'];
            var uploadedContext = newJson['context'];
            var uploadedTasks = newJson['tasks'];

            setTaskSetName(uploadedTaskName); 
            setModelNames(uploadedModelNames);
            setContext(uploadedContext);
            setTasks(uploadedTasks);

        }
        fileReader.readAsText(file);
        file = null;
    }
    
    const createJson = () =>{
        const json ={};
        json.task_name = taskSetName;
        json.model_list = modelNames;
        json.tasks = tasks;
        json.context= context;

        setResultJson(json);
    }

    const handleComplete = () => {
        createJson();
        setResultModalShown(true);
    }

    return (
        <StyledContainer className={classes.root}>

            <Button variant="outlined" color="primary"><label htmlFor="taskset-upload" className="taskset-upload-btn">불러오기</label></Button>
            <input 
                type="file"
                className="taskset-upload" id="taskset-upload" 
                onChange={handleUploadFile}
                accept=".json,.txt"
            ></input> 
            <Button variant="contained" color="primary" onClick={handleComplete}>완료</Button>
        </StyledContainer>
    );
}