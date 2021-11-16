import { Button, Checkbox, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Save';
import $ from 'jquery';
import React from 'react';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    bottomContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom: theme.spacing(1),
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    btn: {
        marginLeft: theme.spacing(1),
    }
}));

const StyledContainer = styled.div`
    .model-list-container{
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        overflow-x: auto;
        overflow-y: auto;
        height: 7rem;
        word-wrap: break-word;
    }
    .input-field{
        width: 100%;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        padding: .5rem;
    }
    .context-input-field{
        width: 100%;
        border: 1px solid #c6c6c6;
        border-radius: 5px;
        padding: .5rem;
    }
    label{
        font-size: xx-small;
        margin: 0;
    }
`;

export default function Taskset({ modelNames, setModelNames, taskSetName, setTaskSetName, context, setContext }) {
    const classes = useStyles();
    const [newTaskSetName, setNewTaskSetName] = React.useState('');
    const [newModel, setNewModel] = React.useState('');
    const [newContext, setNewContext] = React.useState('');
    const [checked, setChecked] = React.useState([]);

    const handleChangeModel = (e) => {
        setNewModel(e.target.value);
    }

    const handleChangeTaskSetName = (e) => {
        setNewTaskSetName(e.target.value);
    }

    const handleChangeContext = (e) => {
        setNewContext(e.target.value);
    }

    const handleClickEditTaskSetName = () => {
        setTaskSetName(newTaskSetName);
    }

    const handleClickEditContext = () => {
        setContext(newContext);
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
        if (newModel === '') {
            alert('모델 명을 입력하세요.');
            return;
        }
        const temp = [...modelNames];
        temp.push(newModel);
        setModelNames(temp);
        $('#new-model-input').val('');
        setNewModel('');
    }

    const handleClickRemove = () => {
        if (checked.length === 0) {
            alert("삭제할 모델을 선택하세요.");
            return;
        }
        var temp = [...modelNames];
        checked.map(c => {
            return temp = temp.filter(m => m !== c);
        });
        setModelNames(temp);
    }

    return (
        <StyledContainer>
            <h5>Taskset 작업</h5>
            {/* task set name */}
            <label>Taskset Name</label>
            <div className={classes.topContainer}>
                <input type="text" className="input-field" defaultValue={taskSetName} placeholder="Enter a taskset name" readOnly={false} onChange={handleChangeTaskSetName}></input>
                <Button className={classes.btn} variant="outlined" color="primary" aria-label="add" onClick={handleClickEditTaskSetName}><EditIcon /></Button>
            </div>

            {/* context */}
            <label>Context</label>
            <div className={classes.topContainer}>
                <input type="text" className="context-input-field" defaultValue={context} placeholder="Enter a context" readOnly={false} onChange={handleChangeContext}></input>
                <Button className={classes.btn} variant="outlined" color="primary" aria-label="add" onClick={handleClickEditContext}><EditIcon /></Button>
            </div>
            
            {/* model list */}
            <label>Model List</label>
            <div className="model-list-container">
                {modelNames.map((t, i) => {
                    const labelId = `checkbox-list-label-${t}`;
                    return (
                        <ListItem key={i} dense button onClick={handleToggle(t)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(t) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={t} />
                        </ListItem>
                    );
                })}
            </div>
            <div className={classes.bottomContainer}>
                <input
                    className="input-field"
                    placeholder="Enter a new model"
                    id="new-model-input"
                    onChange={handleChangeModel}
                />
                <Button className={classes.btn} variant="outlined" color="primary" aria-label="add" onClick={handleClickAdd}><AddIcon /></Button>
                <Button className={classes.btn} variant="outlined" color="primary" aria-label="add" onClick={handleClickRemove}><RemoveIcon /></Button>
            </div>
            

        </StyledContainer>
    );
}