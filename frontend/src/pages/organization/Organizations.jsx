import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getAllOrganizations } from "../../services/organizationService";

import SearchBar from "../../components/organization/SearchBar";
import FilterChips from "../../components/organization/FilterChips";
import OrganizationGrid from "../../components/organization/OrganizationGrid";

function Organizations() {

    const [organizations, setOrganizations] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // --------------------------------------------------
    // LOAD ORGANIZATIONS
    // --------------------------------------------------

    useEffect(() => {
        loadOrganizations();
    }, []);


    const loadOrganizations = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllOrganizations();

            setOrganizations(data);

        } catch (error) {

            console.error(
                "Failed to load organizations:",
                error
            );

            setError(
                "Unable to load organizations."
            );

        } finally {

            setLoading(false);

        }

    };


    // --------------------------------------------------
    // SEARCH + FILTER
    // --------------------------------------------------

    const filteredOrganizations = organizations.filter(
        (organization) => {

            const name =
                organization.name?.toLowerCase() || "";

            const search =
                searchTerm.toLowerCase();

            const matchesSearch =
                name.includes(search);

            const matchesFilter =
                selectedFilter === "All" ||
                organization.type?.toLowerCase() === selectedFilter.toLowerCase();

            return matchesSearch && matchesFilter;

        }
    );


    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* Header */}

            <div className="mb-8">

                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                    Organization Portal
                </p>

                <h1 className="text-3xl font-bold text-slate-900 mt-2">
                    Organizations
                </h1>

                <p className="text-slate-500 mt-2">
                    View and manage registered healthcare organizations.
                </p>

            </div>


            {/* Search */}

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />


            {/* Filters */}

            <FilterChips
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />


            {/* Organizations */}

            <div className="mt-8">

                {/* Loading */}

                {loading && (

                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">

                        <p className="text-sm text-slate-500">
                            Loading organizations...
                        </p>

                    </div>

                )}


                {/* Error */}

                {!loading && error && (

                    <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">

                        <p className="text-sm text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={loadOrganizations}
                            className="mt-4 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* Empty */}

                {!loading &&
                    !error &&
                    filteredOrganizations.length === 0 && (

                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">

                            <p className="font-medium text-slate-900">
                                No organizations found
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Try changing your search or filter.
                            </p>

                        </div>

                    )}


                {/* Organization Cards */}

                {!loading &&
                    !error &&
                    filteredOrganizations.length > 0 && (

                        <OrganizationGrid
                            organizations={filteredOrganizations}
                        />

                    )}

            </div>

        </DashboardLayout>

    );

}

export default Organizations;