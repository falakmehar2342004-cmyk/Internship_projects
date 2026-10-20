
import { useEffect, useMemo, useState } from "react";
import { Search, Users, ShieldCheck, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const { data, error: functionError } =
        await supabase.functions.invoke("admin-users", {
          method: "GET",
        });

      if (functionError) {
        throw new Error(
          functionError.message || "Could not load users."
        );
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!Array.isArray(data?.users)) {
        throw new Error("Unexpected response from admin-users function.");
      }

      setUsers(data.users);
    } catch (err) {
      console.error("Admin users loading error:", err);
      setError(
        err.message || "Unable to load users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(query)
    );
  }, [users, search]);

  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">ADMINISTRATION</p>
        <h2>User management</h2>
        <p className="muted">
          View registered users and their assigned roles.
        </p>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div className="heading-with-icon">
            <div className="setting-icon purple">
              <Users size={20} />
            </div>

            <div>
              <h3>Registered accounts</h3>
              <p>
                {loading
                  ? "Loading accounts..."
                  : `${filteredUsers.length} of ${users.length} accounts`}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={loadUsers}
            disabled={loading}
            aria-label="Refresh users"
            title="Refresh users"
          >
            <RefreshCw size={17} />
          </button>
        </div>

        <label className="search-input admin-search">
          <Search size={17} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            aria-label="Search users"
          />
        </label>

        {loading ? (
          <div className="empty-state">
            <p>Loading registered users...</p>
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <p>{error}</p>
            <button
              type="button"
              className="secondary-button"
              onClick={loadUsers}
            >
              Try again
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <p>
              {search
                ? "No users match your search."
                : "No registered users found."}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.name}</strong>
                    </td>
                    <td>{user.email || "—"}</td>
                    <td>
                      <span
                        className={`status-pill ${
                          user.role === "Admin"
                            ? "purple-pill"
                            : "neutral"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          user.status === "Active"
                            ? "success"
                            : "neutral"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="form-footnote">
        <ShieldCheck size={14} />
        User records are loaded through a server-side function with
        admin authorization.
      </p>
    </div>
  );
}
