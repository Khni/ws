import { useGetPermissionMatrix } from "@/api";
import { ErrorAlert } from "@workspace/ui/core/ErrorAlert";
import LoadingPage from "@workspace/ui/core/loading/loading-page";
import { MatrixView } from "@workspace/ui/core/matrix-view";
export default function PermissionsMatrix() {
  const { data, isLoading } = useGetPermissionMatrix();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (!data) {
    return <ErrorAlert />;
  }
  const rowHeaders = data.resources;

  const columnHeaders = data.actions;

  const cells = data.permissions;

  const checkedCells = [
    { permId: "1" },
    { permId: "2" },
    { permId: "4" },
    { permId: "10" },

    { permId: "6" },
    { permId: "7" },
  ];

  return (
    <MatrixView
      rowHeaders={{ data: rowHeaders, keys: { idKey: "id", nameKey: "name" } }}
      columnHeaders={{
        data: columnHeaders,
        keys: { idKey: "id", nameKey: "name" },
      }}
      cells={{
        data: cells,
        keys: { colIdKey: "actionId", idKey: "id", rowIdKey: "resourceId" },
      }}
      checkedCells={{ data: checkedCells, keys: { cellId: "permId" } }}
      onChange={(newChecked) => console.log("New Checked Cells:", newChecked)}
    />
  );
}
