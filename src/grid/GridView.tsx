import React from "react";
import { Grid } from "snakeegg";

export type GridViewProps = {
    grid: Grid<any>;
}

export class GridView extends React.Component<GridViewProps> {

    public render() {
        const gridArray = this.props.grid.toArray();

        const table = gridArray.forEach

        return (
            <div className="grid">
                <table>
                    <tbody>
                        {gridArray.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}