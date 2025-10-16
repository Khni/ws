import RoleForm from "@/features/role/form/role-details-form";

export default function RolePage({ params }: { params: { orgId: string } }) {
  //here I will fetch organization by id
  return <RoleForm />;
}
