export default function OrganizationPage({
  params,
}: {
  params: { orgId: string };
}) {
  //here I will fetch organization by id
  return <div>{params.orgId}</div>;
}
