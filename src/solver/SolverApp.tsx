import React from 'react';
import { HintedPuzzle, HintCell, Grid, GridCell, Solver, SolveResult, Strategies, SolveCell, PointInt, SolveStep } from 'snakeegg';
import { GridView } from '../grid/GridView';
import { List, Set } from "immutable";
import { Grid as MuiGrid, Container, Box } from "@material-ui/core";
import { SolveStepsView } from './SolveStepsView';
import { SolverControls } from './SolverControls';


type SolverAppState = {
    solveResult: SolveResult,
    currentStepNum: number,
}

export class SolverApp extends React.Component<{}, SolverAppState>  {

    constructor(props: any) {
        super(props);
        this.state = {
            solveResult: this.getSolveResult(),
            currentStepNum: 0,
        };
    }

    protected getSolveResult(): SolveResult {
        let hintGrid: Grid<HintCell> = new Grid(8, 2);

        hintGrid = hintGrid.fromArray([
            [GridCell.SNAKE, null, 2, 2, null, null, null, GridCell.SNAKE],
            [1, null, null, null, null, 3, 3, 3],
        ]);

        const hintedPuzzle = new HintedPuzzle(8, 2, 3, hintGrid);

        const solver = new Solver();

        return solver.solve(hintedPuzzle);
    }

    protected setStepNumber(stepNum: number) {
        this.setState({ currentStepNum: stepNum });
    }

    protected getSolveStep(stepNum: number): SolveStep | null {
        if (stepNum === 0) {
            return null;
        } else {
            const step = this.state.solveResult.steps.get(stepNum - 1);
            if (!step) {
                // typescript safety check, should never happen
                throw 'step not found';
            }
            return step;
        }
    }

    render() {
        const { currentStepNum, solveResult } = this.state;

        const currentStep = this.getSolveStep(currentStepNum);

        const currentPuzzle = currentStep ? currentStep.after : this.state.solveResult.initial;

        const grid = currentPuzzle.getSolveGrid();

        return <Container>
            <Container>
                <h1>Snake Egg solver</h1>
            </Container>
            <MuiGrid container spacing={3}>
                <MuiGrid item xs={12} sm={6}>
                    <Box>
                        {grid && (<GridView grid={grid} highlighted={currentStep?.affectedCells} />)}
                        {!grid && (<p>no grid</p>)}
                    </Box>
                    <Box>
                        <h2>Steps</h2>
                        <SolveStepsView steps={solveResult.steps} currentStepNum={currentStepNum} />
                    </Box>
                </MuiGrid>
                <MuiGrid item xs={12} sm={6}>
                    <Box>
                        <SolverControls solveResult={solveResult} currentStepNum={currentStepNum} setStepNumber={(stepNum) => this.setStepNumber(stepNum)} />
                    </Box>
                    <Box>
                        <h2>Strategies</h2>
                        <ul>
                            {Strategies.map((strategy) => (
                                <li key={strategy.constructor.name} >
                                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        {strategy.constructor.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </MuiGrid>
            </MuiGrid>
        </Container>;
    }

}
