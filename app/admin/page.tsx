import type { Metadata } from "next";
import Link from "next/link";
import "./admin.css";

export const metadata: Metadata = {
  title: "Portfolio Admin | Huzaifa Waqar Butt",
  description: "Owner links for managing Huzaifa Waqar Butt's portfolio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const repositoryUrl = "https://github.com/Huzaifa-170504/Huzaifa-170504.github.io";

const adminActions = [
  {
    label: "Portfolio content",
    title: "Edit projects and credentials",
    description:
      "Open the portfolio content file in GitHub's authenticated editor. Only approved repository collaborators can save changes.",
    href: `${repositoryUrl}/edit/main/app/page.tsx`,
    action: "Open content editor",
  },
  {
    label: "Media library",
    title: "Manage images and public files",
    description:
      "Review the images and other public assets used by the website. The résumé is now managed separately in your Google Drive folder.",
    href: `${repositoryUrl}/tree/main/public`,
    action: "Open website assets",
  },
  {
    label: "Publishing",
    title: "Check website deployments",
    description:
      "After saving a change, confirm that the automatic GitHub Pages build and deployment completed successfully.",
    href: `${repositoryUrl}/actions/workflows/deploy-pages.yml`,
    action: "View deployment status",
  },
];

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="admin-glow admin-glow-one" aria-hidden="true" />
      <div className="admin-glow admin-glow-two" aria-hidden="true" />

      <section className="admin-shell">
        <header className="admin-header">
          <Link className="admin-brand" href="/">
            <span>HWB</span>
            Portfolio
          </Link>
          <span className="admin-status"><i /> Owner workspace</span>
        </header>

        <div className="admin-intro">
          <p>Portfolio management</p>
          <h1>Manage the website through your verified GitHub account.</h1>
          <p>
            GitHub securely controls who can save changes. Sign in to the GitHub account that owns this repository
            before opening any editor below.
          </p>
        </div>

        <div className="admin-grid">
          {adminActions.map((item, index) => (
            <article className="admin-card" key={item.title}>
              <div className="admin-card-top">
                <span>0{index + 1}</span>
                <p>{item.label}</p>
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.action} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <aside className="admin-note">
          <strong>Security note</strong>
          <p>
            No portfolio password is stored in this page. Website changes remain protected by your GitHub account,
            its password, and any two-factor authentication you enable there.
          </p>
        </aside>

        <footer className="admin-footer">
          <Link href="/">← Return to portfolio</Link>
          <span>Huzaifa Waqar Butt</span>
        </footer>
      </section>
    </main>
  );
}
