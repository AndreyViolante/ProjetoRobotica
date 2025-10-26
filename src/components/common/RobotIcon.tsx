export function RobotIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
      <rect x="10" y="15" width="20" height="18" rx="2" fill="url(#gradient)" />
      <circle cx="15" cy="22" r="2" fill="#1E293B" />
      <circle cx="25" cy="22" r="2" fill="#1E293B" />
      <rect x="15" y="28" width="10" height="2" rx="1" fill="#1E293B" />
      <rect x="18" y="8" width="4" height="7" fill="url(#gradient)" />
      <circle cx="20" cy="8" r="3" fill="url(#gradient)" />
      <rect x="6" y="20" width="4" height="8" rx="1" fill="url(#gradient)" />
      <rect x="30" y="20" width="4" height="8" rx="1" fill="url(#gradient)" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}