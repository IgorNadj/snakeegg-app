import React from 'react';
import { HintedPuzzle, HintCell, Grid, GridCell, Solver, SolveResult, Strategies, SolveCell } from 'snakeegg';
import { GridView } from '../grid/GridView';
import { List } from "immutable";


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

        return <div className="solver-app">
            <div className="solver-main">
                {grid && (<GridView grid={grid} />)}
                {!grid && (<p>no grid</p>)}
            </div>
            <div className="solver-control">
                <ul>
                    <li>
                        Has solution: {solveResult.hasSolution}
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
            </div>
            <div className="solver-strategies">
                <ul>
                    {Strategies.map((strategy) => (
                        <li key={strategy.constructor.name}>
                            {strategy.constructor.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>;
    }

}
