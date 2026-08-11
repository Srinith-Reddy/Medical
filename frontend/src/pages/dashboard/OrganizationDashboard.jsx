import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getAllOrganizations } from "../../services/organizationService";

import OrganizationHero from "../../components/organization/OrganizationHero";
import OrganizationStats from "../../components/organization/OrganizationStats";
import OrganizationGrid from "../../components/organization/OrganizationGrid";
import SearchBar from "../../components/organization/SearchBar";
import FilterChips from "../../components/organization/FilterChips";

function OrganizationDashboard() {

    const navigate = useNavigate();

    const [organizations, setOrganizations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    useEffect(() => {
        loadOrganizations();
    }, []);

    const loadOrganizations = async () => {

        try {

            const data = await getAllOrganizations();

            setOrganizations(data);

        } catch (error) {

            console.error(error);

        }

    };

    const filteredOrganizations = organizations.filter((organization) => {

        const matchesSearch =
            organization.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesFilter =
            selectedFilter === "All" ||
            organization.type === selectedFilter;

        return matchesSearch && matchesFilter;

    });

    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* Hero Section */}

            <div className="flex items-start justify-between gap-8 mb-10">

                <div className="flex-1">

                    <OrganizationHero
                        organization={organizations[0]}
                    />

                </div>

                <button
                    onClick={() => navigate("/organization/new")}
                    className="
                        bg-gradient-to-r
                        from-[#4F8EF7]
                        to-[#6C63FF]
                        hover:opacity-90
                        text-white
                        font-semibold
                        px-8
                        py-4
                        rounded-2xl
                        shadow-lg
                        transition
                    "
                >
                    + Add Organization
                </button>

            </div>

            {/* Statistics */}

            <OrganizationStats
                organizations={organizations}
            />

            {/* Search */}

            <div className="mt-10">

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

            </div>

            {/* Filters */}

            <div className="mt-6">

                <FilterChips
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />

            </div>

            {/* Organization Cards */}

            <div className="mt-8">

                <OrganizationGrid
                    organizations={filteredOrganizations}
                />

            </div>

        </DashboardLayout>

    );

}

export default OrganizationDashboard;