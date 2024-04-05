import {ElementHandle} from "@playwright/test";

export class TableRow {
    cells: { [key: string]: ElementHandle };

    constructor(cells: { [key: string]: ElementHandle }) {
        this.cells = cells;
    }

    getCell(key: string): ElementHandle {
        return this.cells[key];
    }
}