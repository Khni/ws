"use client";

import React, { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

export type MatrixViewProps<
  R extends Record<string, any>,
  C extends Record<string, any>,
  Cell extends Record<string, any>,
  Checked extends Record<string, any>,
  RowIdKey extends keyof R = keyof R,
  ColIdKey extends keyof C = keyof C,
  CellIdKey extends keyof Cell = keyof Cell,
> = {
  rowHeaders: {
    data: R[];
    keys: { idKey: RowIdKey; nameKey?: keyof R };
  };
  columnHeaders: {
    data: C[];
    keys: { idKey: ColIdKey; nameKey: keyof C };
  };
  cells: {
    data: Cell[];
    keys: { idKey: CellIdKey; rowIdKey: keyof Cell; colIdKey: keyof Cell };
  };
  checkedCells?: { data: Checked[]; keys: { cellId: keyof Checked } };
  onChange?: (checked: Checked[]) => void;

  /**
   * Custom render function for cells
   */
  renderCell?: (params: {
    cell: Cell;
    row: R;
    column: C;
    checked: boolean;
    toggle: () => void;
  }) => ReactNode;

  /**
   * Optional class names for styling
   */
  className?: string;
};

export function MatrixView<
  R extends Record<string, any>,
  C extends Record<string, any>,
  Cell extends Record<string, any>,
  Checked extends Record<string, any>,
  RowIdKey extends keyof R = keyof R,
  ColIdKey extends keyof C = keyof C,
  CellIdKey extends keyof Cell = keyof Cell,
>({
  rowHeaders,
  columnHeaders,
  cells,
  checkedCells = { data: [], keys: { cellId: "cellId" } },
  onChange,
  renderCell,
  className,
}: MatrixViewProps<R, C, Cell, Checked, RowIdKey, ColIdKey, CellIdKey>) {
  const [_checkedCells, setCheckedCells] = useState<Checked[]>(
    checkedCells.data
  );

  // ✅ Helpers
  const getRowId = (row: R) => row[rowHeaders.keys.idKey];
  const getColId = (col: C) => col[columnHeaders.keys.idKey];
  const getRowName = (row: R) =>
    rowHeaders.keys.nameKey ? row[rowHeaders.keys.nameKey] : getRowId(row);
  const getColName = (col: C) => col[columnHeaders.keys.nameKey];

  const getCellId = (cell: Cell) => cell[cells.keys.idKey];
  const getCellRowId = (cell: Cell) => cell[cells.keys.rowIdKey];
  const getCellColId = (cell: Cell) => cell[cells.keys.colIdKey];

  const isCellChecked = (cellId: string | number) =>
    _checkedCells.some((c) => Object.values(c).includes(cellId));

  const handleToggle = (cellId: string | number) => {
    setCheckedCells((prev) => {
      const exists = isCellChecked(cellId);
      const newChecked = exists
        ? prev.filter((c) => !Object.values(c).includes(cellId))
        : [...prev, { cellId } as unknown as Checked];

      onChange?.(newChecked);
      return newChecked;
    });
  };

  const findCell = (rowId: string | number, colId: string | number) =>
    cells.data.find(
      (c) => getCellRowId(c) === rowId && getCellColId(c) === colId
    );

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden ${className ?? ""}`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-muted font-semibold w-40 text-left">
              Resources
            </TableHead>
            {columnHeaders.data.map((col) => (
              <TableHead
                key={getColId(col)}
                className="text-center font-semibold bg-muted"
              >
                {getColName(col)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rowHeaders.data.map((row) => (
            <TableRow key={getRowId(row)}>
              <TableCell className="font-medium bg-muted/30 text-left">
                {getRowName(row)}
              </TableCell>

              {columnHeaders.data.map((col) => {
                const cell = findCell(getRowId(row), getColId(col));

                if (!cell)
                  return (
                    <TableCell key={getColId(col)} className="text-center">
                      <div>-</div>
                    </TableCell>
                  );

                const cellId = getCellId(cell);
                const checked = isCellChecked(cellId);
                const toggle = () => handleToggle(cellId);

                return (
                  <TableCell key={getColId(col)} className="text-center">
                    {renderCell ? (
                      renderCell({
                        cell,
                        row,
                        column: col,
                        checked,
                        toggle,
                      })
                    ) : (
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={checked}
                        onChange={toggle}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
