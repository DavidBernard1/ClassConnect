import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

async function getOverviewStats() {
  const [users, activeUsers, posts, stories, comments, likes, reports, groups] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { isActive: true } }),
    db.post.count(),
    db.story.count(),
    db.comment.count(),
    db.like.count(),
    db.report.count(),
    db.group.count(),
  ]);

  return { users, activeUsers, posts, stories, comments, likes, reports, groups };
}

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) redirect("/login");

  const stats = await getOverviewStats();

  return (
    <div className="app-shell">
      <header className="topbar"><div className="topbar-inner"><div className="brand-block"><div className="brand-logo"><img src="/logo.svg" alt="DavidNet Technologies" /></div><span>ClassConnect Admin</span></div><div className="nav-actions"><a href="/feed" className="btn ghost">Back to app</a><form action="/api/auth/logout" method="post"><button className="btn">Logout</button></form></div></div></header>
      <main className="page">
        <div className="admin-grid">
          <div className="stat-card"><div>Total users</div><div className="stat-number">{stats.users}</div></div>
          <div className="stat-card"><div>Active users</div><div className="stat-number">{stats.activeUsers}</div></div>
          <div className="stat-card"><div>Posts</div><div className="stat-number">{stats.posts}</div></div>
          <div className="stat-card"><div>Stories</div><div className="stat-number">{stats.stories}</div></div>
          <div className="stat-card"><div>Comments</div><div className="stat-number">{stats.comments}</div></div>
          <div className="stat-card"><div>Likes</div><div className="stat-number">{stats.likes}</div></div>
          <div className="stat-card"><div>Reports</div><div className="stat-number">{stats.reports}</div></div>
          <div className="stat-card"><div>Groups</div><div className="stat-number">{stats.groups}</div></div>
        </div>

        <div className="card" style={{marginTop:24, padding:18}}>
          <h3>Admin audit</h3>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Action</th><th>Admin</th><th>Date</th><th>Target</th></tr></thead>
              <tbody>
                <tr><td>Login</td><td>{user.username}</td><td>{new Date().toLocaleString()}</td><td>Admin panel</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
