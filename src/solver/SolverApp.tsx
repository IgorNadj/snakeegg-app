import React from 'react';
import { HintedPuzzle, HintCell, Grid, GridCell, Solver, SolveResult } from 'snakeegg';
import { GridView } from '../grid/GridView';

type SolverAppState = {
    solveResult: SolveResult,
}

export class SolverApp extends React.Component<{}, SolverAppState>  {

    constructor(props: any) {
        super(props);
        this.state = { solveResult: this.getSolveResult() };
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

    render() {
        const grid = this.state?.solveResult?.solution?.getSolveGrid();

        return <div className="solver-app">
            {grid && (<GridView grid={grid} />)}
            {!grid && (<p>no grid</p>)}
        </div>;
    }

}
