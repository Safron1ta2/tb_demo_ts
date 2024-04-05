import {ElementHandle} from "@playwright/test";
import {TableRow} from "./TableRow";

export interface ITableHandler {
    getTable(): Promise<ElementHandle>;

    getAllRows(): Promise<ElementHandle[]>;

    getAllCellsInRow(row: ElementHandle): Promise<TableRow>;

    getCellByName(rowCells: TableRow, columnName: string): Promise<ElementHandle>;
}