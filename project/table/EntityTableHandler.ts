import {Page} from "playwright";
import {ElementHandle} from "@playwright/test";
import {ITableHandler} from "./ITableHandler";
import {TableRow} from "./TableRow";

export class EntityTableHandler implements ITableHandler {
    page: Page;
    headerKeys: string[];

    constructor(page: Page, headerKeys: string[]) {
        this.page = page;
        this.headerKeys = headerKeys;
    }

    async getTable(): Promise<ElementHandle> {
        return await this.page.waitForSelector('//table', {state: 'attached'});
    }

    async getAllRows(): Promise<ElementHandle[]> {
        const table: ElementHandle = await this.getTable();
        await table.waitForSelector('//tbody/mat-row', {state: 'attached'});
        return table.$$('//tbody/mat-row');
    }


    async getAllCellsInRow(row: ElementHandle): Promise<TableRow> {
        if (!row) {
            throw new Error('Row element is undefined');
        }
        await row.waitForSelector('//mat-cell', {state: 'attached'});

        const cells: ElementHandle[] = await row.$$('//mat-cell');
        const cellMap: { [key: string]: ElementHandle } = {};

        this.headerKeys.forEach((key: string, index: number) => {
            cellMap[key] = cells[index];
        });

        return new TableRow(cellMap);
    }

    async getCellByName(rowCells: TableRow, columnName: string): Promise<ElementHandle> {
        return rowCells.getCell(columnName);
    }

    async getSpanForNameCell(row: ElementHandle): Promise<ElementHandle> {
        const rowCells: TableRow = await this.getAllCellsInRow(row);
        const nameCell: ElementHandle = await this.getCellByName(rowCells, 'Name');
        if (!nameCell) {
            throw new Error('Name cell is undefined');
        }
        await nameCell.waitForSelector("//span", {state: 'attached'});

        const span: ElementHandle | null = await nameCell.$("//span");
        if (!span) {
            throw new Error('Span in name cell is not found');
        }
        return span;
    }

    async getButtonsCell(row: ElementHandle): Promise<ElementHandle> {
        const rowCells: TableRow = await this.getAllCellsInRow(row);
        return this.getCellByName(rowCells, 'Buttons');
    }

}