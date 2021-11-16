import React from 'react';
import styled from "styled-components";
import TaskList from './components/TaskList';
import Taskset from './components/Taskset';
import RunButtons from './components/RunButtons';
import JobList from './components/JobList';
import ResultModal from './components/ResultModal';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 2rem;
    .left-column{
        width: 25rem;
        margin-right: 2rem;
    }
    .right-column{
        width: 60rem;
    }
`;

export default function JsonBuilder() {
    const [taskSetName, setTaskSetName] = React.useState('');
    const [modelNames, setModelNames] = React.useState([]);
    const [context, setContext] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const [resultJson, setResultJson] = React.useState('');
    const [resultModalShown, setResultModalShown] = React.useState(false);

    return (
        <StyledContainer>

            <div className="left-column">
                <Taskset 
                    modelNames={modelNames} 
                    setModelNames={setModelNames} 
                    taskSetName={taskSetName}
                    setTaskSetName={setTaskSetName}
                    context={context}
                    setContext={setContext}
                />
                <TaskList 
                    tasks={tasks}
                    setTasks={setTasks}
                />
                <RunButtons 
                    setTaskSetName={setTaskSetName}
                    setModelNames={setModelNames} 
                    setResultModalShown={setResultModalShown}
                    setContext={setContext}
                    setTasks={setTasks}
                    taskSetName={taskSetName}
                    modelNames={modelNames} 
                    context={context}
                    tasks={tasks}
                    setResultJson={setResultJson}
                />
            </div>
            <div className="right-column">
                <JobList 
                    tasks={tasks} 
                    setTasks={setTasks}
                />
            </div>

            <ResultModal 
                resultModalShown={resultModalShown} 
                setResultModalShown={setResultModalShown} 
                resultJson={resultJson}
            />

        </StyledContainer>
    );
}