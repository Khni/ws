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

// ✅ Define Prop Types
export type MatrixViewProps = {
  rowHeaders: { id: string; name: string }[];
  columnHeaders: { id: string; name: string }[];
  cells: { id: string; rowId: string; colId: string }[];
  checkedCells?: { cellId: string }[];
  onChange?: (checkedCells: { cellId: string }[]) => void;
};

export const MatrixView: React.FC<MatrixViewProps> = ({
  rowHeaders,
  columnHeaders,
  cells,
  checkedCells = [],
  onChange,
}) => {
  const [_checkedCells, setCheckedCells] = useState(checkedCells);

  // ✅ Check if a cell is active
  const isCellChecked = (cellId: string) =>
    _checkedCells.some((p) => p.cellId === cellId);

  // ✅ Find cell by row/col
  const findCell = (rowId: string, colId: string) =>
    cells.find((c) => c.rowId === rowId && c.colId === colId);

  // ✅ Toggle checkbox state
  const handleToggle = (cellId: string) => {
    setCheckedCells((prev) => {
      const exists = prev.some((p) => p.cellId === cellId);
      const newChecked = exists
        ? prev.filter((p) => p.cellId !== cellId)
        : [...prev, { cellId }];

      onChange?.(newChecked);
      return newChecked;
    });
  };

  return (
    <div className="rounded-2xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-muted font-semibold w-40 text-left">
              Resources
            </TableHead>
            {columnHeaders.map((col) => (
              <TableHead
                key={col.id}
                className="text-center font-semibold bg-muted"
              >
                {col.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rowHeaders.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium bg-muted/30 text-left">
                {row.name}
              </TableCell>

              {columnHeaders.map((col) => {
                const cell = findCell(row.id, col.id);
                const checked = cell ? isCellChecked(cell.id) : false;

                return (
                  <TableCell key={col.id} className="text-center">
                    {!cell ? (
                      <div>-</div>
                    ) : (
                      <Checkbox
                        className="cursor-pointer"
                        checked={checked}
                        onCheckedChange={() => handleToggle(cell.id)}
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
