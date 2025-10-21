import React from "react";

export default function OrganizationPage({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = React.use(params);
  //here I will fetch organization by id
  return <div>{orgId}</div>;
}
