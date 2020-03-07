import { SolveResult } from "snakeegg";
import React from 'react';


export type SolverControlsProps = {
    solveResult: SolveResult,
    currentStepNum: number,
    setStepNumber: (stepNum: number) => void,
}

export const SolverControls: React.SFC<SolverControlsProps> = (props) => {

    const stepForward = () => {
        if (props.currentStepNum < props.solveResult.steps.size) {
            props.setStepNumber(props.currentStepNum + 1);
        }
    }

    const stepBack = () => {
        if (props.currentStepNum > 0) {
            props.setStepNumber(props.currentStepNum - 1);
        }
    }

    const showSolution = () => {
        props.setStepNumber(props.solveResult.steps.size);
    }

    const showInitialPuzzle = () => {
        props.setStepNumber(0);
    };

    return (
        <ul>
            <li>
                Has solution: {props.solveResult.hasSolution ? 'yes' : 'no'}
            </li>
            <li>
                Step: {props.currentStepNum} / {props.solveResult.steps.size}
            </li>
            <li>
                <button onClick={stepForward}>Step {'>'}</button>
            </li>
            <li>
                <button onClick={stepBack}>{'<'} Step</button>
            </li>
            <li>
                <button onClick={showInitialPuzzle}>Show initial puzzle</button>
            </li>
            <li>
                <button onClick={showSolution}>Show solution</button>
            </li>
        </ul>
    );

}