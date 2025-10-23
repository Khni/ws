import { MatrixView } from "@workspace/ui/core/matrix-view";
export default function PermissionsMatrix() {
  const rowHeaders = [
    { name: "Role", rowId: "5c9d1c6a-90a0-4a27-9a3b-5b0a1a582b4b" },
    { name: "Users", rowId: "a3b4f6b9-21c2-4c61-bd88-46b7393dc2e9" },
  ];

  const columnHeaders = [
    { name: "Create", colId: "7c2a68c1-b5a1-45ef-86a0-1f64b87f2a4d" },
    { name: "Update", colId: "b0fd8e7f-92d7-4c18-9d0b-06b3f513d129" },
    { name: "Read", colId: "c37bdf40-243d-4a67-a2b4-9f8797c5b94d" },
    { name: "Delete", colId: "de219b3c-f8f8-4b55-bd67-96a871735f2e" },
  ];

  const cells = [
    {
      cellId: "f5a8a3c1-1cb3-40bb-9a2c-1a44a0f87bfa",
      rowId: rowHeaders[0]?.rowId!,
      colId: columnHeaders[0]?.colId!,
    },
    {
      cellId: "1de298b7-4c7f-4c12-9c8e-11f16d15b942",
      rowId: rowHeaders[0]?.rowId!,
      colId: columnHeaders[1]?.colId!,
    },
    {
      cellId: "a93b7df2-fad9-4a7a-a2fd-f1c8a7b5679a",
      rowId: rowHeaders[1]?.rowId!,
      colId: columnHeaders[0]?.colId!,
    },
    {
      cellId: "cb3a47a1-f40e-4f89-a91f-b4c17dc931a7",
      rowId: rowHeaders[1]?.rowId!,
      colId: columnHeaders[2]?.colId!,
    },
  ];

  const checkedCells = [
    { cellId: "f5a8a3c1-1cb3-40bb-9a2c-1a44a0f87bfa" },
    { cellId: "cb3a47a1-f40e-4f89-a91f-b4c17dc931a7" },
  ];

  return (
    <MatrixView
      rowHeaders={rowHeaders}
      rowIdKey="rowId"
      rowNameKey="name"
      columnHeaders={columnHeaders}
      colIdKey="colId"
      colNameKey="name"
      cells={cells}
      cellIdKey="cellId"
      checkedCells={checkedCells}
      onChange={(newChecked) => console.log("New Checked Cells:", newChecked)}
    />
  );
}
