const statusStyles: Record<string, string> = {
  new: 'admin-status-new',
  reviewed: 'admin-status-reviewed',
  shortlisted: 'admin-status-shortlisted',
  accepted: 'admin-status-accepted',
  waitlisted: 'admin-status-waitlisted',
  rejected: 'admin-status-rejected',
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-status-badge ${statusStyles[status] ?? 'admin-status-reviewed'}`}>{status}</span>;
}