"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Checkbox } from "@workspace/ui/components/checkbox";

// ✅ Generic Prop Types
export type MatrixViewProps<
  R extends Record<string, any>,
  C extends Record<string, any>,
  Cell extends Record<string, any>,
  Checked extends Record<string, any>,
  RowIdKey extends keyof R = keyof R,
  ColIdKey extends keyof C = keyof C,
  CellIdKey extends keyof Cell = keyof Cell,
> = {
  rowHeaders: R[];
  columnHeaders: C[];
  cells: Cell[];
  checkedCells?: Checked[];
  onChange?: (checked: Checked[]) => void;

  // ✅ Keys to use for mapping (type-safe)
  rowIdKey: RowIdKey;
  colIdKey: ColIdKey;
  cellIdKey: CellIdKey;

  // ✅ For rendering names
  rowNameKey?: keyof R;
  colNameKey?: keyof C;
};

export const MatrixView = <
  R extends Record<string, any>,
  C extends Record<string, any>,
  Cell extends Record<string, any>,
  Checked extends Record<string, any>,
>({
  rowHeaders,
  columnHeaders,
  cells,
  checkedCells = [],
  onChange,
  rowIdKey,
  colIdKey,
  cellIdKey,
  rowNameKey,
  colNameKey,
}: MatrixViewProps<R, C, Cell, Checked>) => {
  const [_checkedCells, setCheckedCells] = useState(checkedCells);

  // ✅ Helper to get a type-safe ID value
  const getKeyValue = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    key: K
  ) => obj[key] as string;

  const isCellChecked = (cellId: string) =>
    _checkedCells.some((p: any) => p[cellIdKey] === cellId);

  const findCell = (rowId: string, colId: string) =>
    cells.find(
      (c) =>
        getKeyValue(c, rowIdKey as keyof Cell) === rowId &&
        getKeyValue(c, colIdKey as keyof Cell) === colId
    );

  const handleToggle = (cellId: string) => {
    setCheckedCells((prev: any[]) => {
      const exists = prev.some((p) => p[cellIdKey] === cellId);
      const newChecked = exists
        ? prev.filter((p) => p[cellIdKey] !== cellId)
        : [...prev, { [cellIdKey]: cellId }];

      onChange?.(newChecked as Checked[]);
      return newChecked;
    });
  };

  return (
    <div className="rounded-2xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-muted font-semibold w-40 text-left"></TableHead>
            {columnHeaders.map((col) => (
              <TableHead
                key={getKeyValue(col, colIdKey)}
                className="text-center font-semibold bg-muted"
              >
                {colNameKey
                  ? getKeyValue(col, colNameKey)
                  : getKeyValue(col, colIdKey)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rowHeaders.map((row) => (
            <TableRow key={getKeyValue(row, rowIdKey)}>
              <TableCell className="font-medium bg-muted/30 text-left">
                {rowNameKey
                  ? getKeyValue(row, rowNameKey)
                  : getKeyValue(row, rowIdKey)}
              </TableCell>

              {columnHeaders.map((col) => {
                const rowId = getKeyValue(row, rowIdKey);
                const colId = getKeyValue(col, colIdKey);
                const cell = findCell(rowId, colId);
                const checked = cell
                  ? isCellChecked(getKeyValue(cell, cellIdKey))
                  : false;

                return (
                  <TableCell key={colId} className="text-center">
                    {!cell ? (
                      <div>-</div>
                    ) : (
                      <Checkbox
                        className="cursor-pointer"
                        checked={checked}
                        onCheckedChange={() =>
                          handleToggle(getKeyValue(cell, cellIdKey))
                        }
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
};
