import { Button, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import UpIcon from '@material-ui/icons/ExpandLess';
import DownIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import $ from 'jquery';
import React from 'react';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },

    bottomContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom: theme.spacing(1),
    },
    btn: {
        marginLeft: theme.spacing(1),
    },
}));


const StyledContainer = styled.div`
    margin-top: 2rem;
    .list-container{
        height: 15rem;
        overflow: auto;
        border: 1px solid #c6c6c6;
        margin-bottom: 1rem;
        border-radius: 5px;
    }
    .input-field{
        width: 100%;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        padding: .5rem;
    }
    
`;



// taskArray == taskNames
export default function TaskList({ tasks, setTasks }) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [newTask, setNewTask] = React.useState('');

    const handleChange = (e) => {
        setNewTask(e.target.value);
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleClickAdd = () => {
        if (newTask === '') {
            alert("태스크명을 입력하세요.");
            return;
        }
        var tempTasks = [...tasks];
        const temp = {name: newTask, jobs:[]};
        tempTasks.push(temp);
        setTasks(tempTasks);
        $('#new-task-input').val('');
        setNewTask('');
    }

    const handleClickRemove = () => {
        if (checked.length === 0) {
            alert("삭제할 태스크를 선택하세요.");
            return;
        }
        var tempTasks = [...tasks];
        checked.map( c => {
            console.log(c);
            tempTasks = tempTasks.filter(task => task.name !== c.name);
            return null;
        })
        setTasks(tempTasks);
    }

    const handleClickUp = (task) => {
        const currentIndex = tasks.indexOf(task);

        var tempTask = [...tasks];
        if (currentIndex === 0) {
            alert("최상위 태스크 입니다.");
            return;
        }
        else {
            var upperTask = tempTask[currentIndex-1];
            tempTask[currentIndex-1] = tempTask[currentIndex];
            tempTask[currentIndex] = upperTask;
            setTasks(tempTask);
        }
    }

    const handleClickDown = (task) => {
        const currentIndex = tasks.indexOf(task);
        var tempTask = [...tasks];
        if (currentIndex === tasks.length - 1) {
            alert("최하위 태스크 입니다.");
        }
        else {
            var lowerTask = tempTask[currentIndex+1];
            tempTask[currentIndex+1] = tempTask[currentIndex];
            tempTask[currentIndex] = lowerTask;
            setTasks(tempTask);
        }
    }


    return (
        <StyledContainer>
            <h5>Task 목록</h5>
            <div className="list-container">
                <List className={classes.root}>
                    {tasks.map((task) => {
                        const labelId = `checkbox-list-label-${task.name.replaceAll(' ','')}`;
                        return (
                            <ListItem key={task.name} dense button onClick={handleToggle(task)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(task) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={task.name} />

                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="down" onClick={() => handleClickUp(task)}>
                                        <UpIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="up" onClick={() => handleClickDown(task)}>
                                        <DownIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>


            <div className={classes.bottomContainer}>
                <input className="input-field" onChange={handleChange} placeholder="Enter a new task" id="new-task-input" />
                <Button className={classes.btn} variant="outlined" color="primary" aria-label="add" onClick={handleClickAdd}><AddIcon /></Button>
                <Button className={classes.btn} variant="outlined" color="primary" aria-label="add" onClick={handleClickRemove}><RemoveIcon /></Button>
            </div>

        </StyledContainer>
    );
}