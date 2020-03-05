import React from "react";
import { Grid, PointInt } from "snakeegg";
import { Set } from "immutable";

export type GridViewProps = {
    grid: Grid<any>;
    highlighted?: Set<PointInt>,
}

export class GridView extends React.Component<GridViewProps> {

    public render() {
        const gridArray = this.props.grid.toArray();
        const { highlighted } = this.props;

        return (
            <div className="grid">
                <table style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                        {gridArray.map((row, y) => (
                            <tr style={{ height: 30, minHeight: 30 }} key={y}>
                                {row.map((cell, x) => (
                                    <td style={{ width: 30, minWidth: 30, textAlign: "center", borderStyle: 'solid', borderColor: '#aaa', borderWidth: 1, backgroundColor: highlighted?.contains(new PointInt(x, y)) ? '#b1e8b1' : '' }} key={x}>
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