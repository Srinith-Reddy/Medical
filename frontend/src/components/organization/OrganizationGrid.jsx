import OrganizationCard from "./OrganizationCard";

function OrganizationGrid({ organizations }) {

  return (

    <div className="grid grid-cols-3 gap-6 mt-8">

      {organizations.map((organization) => (

        <OrganizationCard
          key={organization.id}
          organization={organization}
        />

      ))}

    </div>

  );

}

export default OrganizationGrid;