import { Search, Filter } from 'lucide-react';

// Controlled filters allow ActivityLogs to own and combine search/status state.
export default function ActivityFilters({ search, onSearchChange, status, onStatusChange }) {
  return <div className="activity-filters"><label className="search-input"><Search size={17} /><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search activity or device..." aria-label="Search activity" /></label><label className="filter-select"><Filter size={16} /><select value={status} onChange={(event) => onStatusChange(event.target.value)} aria-label="Filter by status"><option value="All">All statuses</option><option value="Success">Success</option><option value="Failed">Failed</option></select></label></div>;
}
