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
                <table style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                        {gridArray.map((row, rowIndex) => (
                            <tr style={{ height: 30, minHeight: 30 }} key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td style={{ width: 30, minWidth: 30, textAlign: "center", borderStyle: 'solid', borderColor: '#aaa', borderWidth: 1 }} key={colIndex}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}