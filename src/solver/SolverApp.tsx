import React from 'react';
import { HintedPuzzle, HintCell, Grid, GridCell, Solver, SolveResult, Strategies, SolveCell } from 'snakeegg';
import { GridView } from '../grid/GridView';
import { List } from "immutable";
import { Grid as MuiGrid, Container, Box } from "@material-ui/core";


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

    protected stepForward() {
        if (this.state.currentStepNum < this.state.solveResult.steps.size) {
            this.setState({ currentStepNum: this.state.currentStepNum + 1 });
        }
    }

    protected stepBack() {
        if (this.state.currentStepNum > 0) {
            this.setState({ currentStepNum: this.state.currentStepNum - 1 });
        }
    }

    protected showSolution() {
        this.setState({ currentStepNum: this.state.solveResult.steps.size });
    }

    protected showInitialPuzzle() {
        this.setState({ currentStepNum: 0 });
    }

    protected getGrid(stepNum: number): Grid<SolveCell> {
        if (stepNum === 0) {
            return this.state.solveResult.initial.getSolveGrid();
        } else {
            const step = this.state.solveResult.steps.get(stepNum - 1);
            if (!step) {
                // typescript safety check, should never happen
                throw 'step not found';
            }
            return step.after.getSolveGrid();
        }
    }

    render() {
        const { currentStepNum, solveResult } = this.state;
        const grid = this.getGrid(currentStepNum);

        return <Container>
            <Container>
                <h1>Snake Egg solver</h1>
            </Container>
            <MuiGrid container spacing={3}>
                <MuiGrid item xs={12} sm={6}>
                    {grid && (<GridView grid={grid} />)}
                    {!grid && (<p>no grid</p>)}
                </MuiGrid>
                <MuiGrid item xs={12} sm={6}>
                    <Box>
                        <ul>
                            <li>
                                Has solution: {solveResult.hasSolution ? 'yes' : 'no'}
                            </li>
                            <li>
                                Step: {currentStepNum} / {solveResult.steps.size}
                            </li>
                            <li>
                                <button onClick={() => this.stepForward()}>Step {'>'}</button>
                            </li>
                            <li>
                                <button onClick={() => this.stepBack()}>{'<'} Step</button>
                            </li>
                            <li>
                                <button onClick={() => this.showInitialPuzzle()}>Show initial puzzle</button>
                            </li>
                            <li>
                                <button onClick={() => this.showSolution()}>Show solution</button>
                            </li>
                        </ul>
                    </Box>
                    <Box>
                        <ul>
                            {Strategies.map((strategy) => (
                                <li key={strategy.constructor.name}>
                                    {strategy.constructor.name}
                                </li>
                            ))}
                        </ul>
                    </Box>
                </MuiGrid>
            </MuiGrid>
        </Container>;
    }

}
