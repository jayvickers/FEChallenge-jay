import React, { useState } from 'react';
import { IFormattedDataTableRow, IRowState, TCell, TValueType } from '../../types/tableTypes';
import { Button, Checkbox, TextInput } from 'carbon-components-react';

import { Save32 } from '@carbon/icons-react';
interface IUpdateRowProps {
    row: IFormattedDataTableRow,
    updateRow: (rowId: string, newVals: IRowState[]) => void;
}

const IUpdateRow: React.FC<IUpdateRowProps> = (props: IUpdateRowProps) => {
    const cells: TCell[] = props.row.cells;
    var cellVals: IRowState[] = [];
    cells.forEach((cell: TCell) => {
        cellVals.push({
            value: cell.value,
            modified: false
        })
    });

    const [rowVals, setRowVals] = useState<IRowState[]>(cellVals);

    /************************/
    /****EVENT HANDLERS*****/
    /************************/

    const handleInputChange = (value: TValueType, index: number) => {
        let newRowVals: IRowState[] = [...rowVals];
        newRowVals[index].value = value;
        newRowVals[index].modified = true;
        setRowVals(newRowVals);
    }

    const handleUpdateRow = () => {
        let oldVals: IRowState[] = [...rowVals];
        oldVals.forEach((cell: IRowState) => {
            cell.modified = false;
        });
        setRowVals(oldVals);
        props.updateRow(props.row.id, rowVals);
    }

    return (
        <div className="update-row">
            <Button
                className="update-row__update-btn"
                disabled={!rowVals.some(cell => cell.modified === true)}
                kind="primary"
                renderIcon={Save32}
                onClick={handleUpdateRow}>
                Update Row Values
            </Button>
            {props.row.cells.map((cell: TCell, index: number) => (
                index === 2 ?
                    <Checkbox
                        wrapperClassName="update-row__input--checkbox"
                        defaultChecked={cell.value === true}
                        labelText="Supported?"
                        key={props.row.id + index}
                        id={props.row.id + index}
                        onChange={(e: boolean) => { handleInputChange(e, index) }}
                        title="update value" />
                    :
                    <TextInput
                        className="update-row__input--text"
                        disabled={index === 1}
                        id={props.row.id + index}
                        key={props.row.id + index}
                        labelText={cell.info.header}
                        value={rowVals[index].value.toString()}
                        onChange={(e) => { handleInputChange(e.target.value, index) }}
                        warn={rowVals[index].modified}
                    />
            ))}
        </div>
    );
};

export default IUpdateRow;
