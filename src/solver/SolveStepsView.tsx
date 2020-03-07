import { List } from 'immutable';
import { SolveStep } from 'snakeegg';
import React from 'react';

export type SolveStepsProps = {
    steps: List<SolveStep>,
    currentStepNum: number,
}

export const SolveStepsView: React.SFC<SolveStepsProps> = (props) => {

    return (
        <ol>
            {props.steps.map((solveStep, index) => (
                <li key={index}>
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: index === props.currentStepNum - 1 ? 'bold' : 'normal' }}>
                        {solveStep.strategy.constructor.name}
                    </div>
                </li>
            ))}
        </ol>
    );

}