export default function ToothMascot() {
  return (
    <svg
      viewBox="0 0 520 520"
      role="img"
      aria-label="Diş fırçasıyla gülümseyen sevimli diş maskotu"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="mascotGround" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#DFF5E9" />
          <stop offset="1" stopColor="#D9EEFF" />
        </linearGradient>
        <linearGradient id="toothShine" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1FCF8" />
        </linearGradient>
      </defs>

      <path
        d="M64 271c-1-88 70-177 170-190 102-13 198 54 212 143 15 95-36 184-132 209-103 26-247-47-250-162Z"
        fill="url(#mascotGround)"
      />
      <circle cx="100" cy="181" r="14" fill="#FFE7A2" />
      <circle cx="406" cy="322" r="10" fill="#F7B6A9" />
      <path d="m399 113 8 19 20 8-20 7-8 20-7-20-20-7 20-8 7-19Z" fill="#FFD66F" />
      <path d="m112 341 5 12 13 5-13 5-5 12-5-12-12-5 12-5 5-12Z" fill="#FFFDF8" />
      <path d="M373 400c15-16 36-18 50-6" fill="none" stroke="#8DCDB1" strokeWidth="6" strokeLinecap="round" />
      <path d="M100 134c11-8 24-7 34 2" fill="none" stroke="#8DCDB1" strokeWidth="5" strokeLinecap="round" />

      <ellipse cx="266" cy="439" rx="121" ry="20" fill="#94CDB6" opacity="0.35" />

      {/* Little legs and sneakers */}
      <path d="M225 381c2 23-3 39-10 52" fill="none" stroke="#17685F" strokeWidth="13" strokeLinecap="round" />
      <path d="M307 379c-1 25 8 41 16 53" fill="none" stroke="#17685F" strokeWidth="13" strokeLinecap="round" />
      <path d="M194 429c-16 2-27 12-24 22 2 8 16 11 37 7 16-3 24-9 20-17-4-9-17-14-33-12Z" fill="#ED917C" stroke="#17685F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M322 429c16 2 27 12 24 22-2 8-16 11-37 7-16-3-24-9-20-17 4-9 17-14 33-12Z" fill="#F3BD4E" stroke="#17685F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m180 443 27 2m105-2 27 2" stroke="#FFFDF8" strokeWidth="4" strokeLinecap="round" />

      {/* Tooth arms */}
      <path d="M165 269c-25-4-39-16-49-37" fill="none" stroke="#17685F" strokeWidth="13" strokeLinecap="round" />
      <path d="M113 232c-7-14-1-25 8-28 10-3 21 5 23 17" fill="#FFF" stroke="#17685F" strokeWidth="6" strokeLinejoin="round" />
      <path d="M357 271c18-9 30-22 39-41" fill="none" stroke="#17685F" strokeWidth="13" strokeLinecap="round" />
      <path d="M383 227c1-14 10-22 20-18 10 4 12 17 6 28" fill="#FFF" stroke="#17685F" strokeWidth="6" strokeLinejoin="round" />

      {/* Toothbrush held aloft */}
      <g transform="rotate(27 410 170)">
        <rect x="400" y="118" width="19" height="115" rx="9.5" fill="#F3BD4E" stroke="#17685F" strokeWidth="5" />
        <path d="M403 126v-20c0-9 6-15 13-15s13 6 13 15v20" fill="#FFF" stroke="#17685F" strokeWidth="5" strokeLinejoin="round" />
        <path d="M407 104v-9m8 9v-10m8 10v-8" stroke="#65B99B" strokeWidth="4" strokeLinecap="round" />
        <path d="M406 161h7m0 16h7m-14 16h7" stroke="#FFE8A4" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Smiling tooth mascot */}
      <path
        d="M179 115c-32 7-46 38-41 78 5 43 23 72 34 111 12 41 16 83 40 86 23 3 26-58 48-61 23-3 32 62 55 60 24-2 31-49 42-91 11-40 31-77 31-122 0-42-22-72-57-74-25-2-43 15-65 16-23 1-47-9-87-3Z"
        fill="url(#toothShine)"
        stroke="#17685F"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d="M178 138c14-14 33-17 48-14" fill="none" stroke="#FFF" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
      <ellipse cx="215" cy="226" rx="6.5" ry="9" fill="#203B40" />
      <ellipse cx="303" cy="226" rx="6.5" ry="9" fill="#203B40" />
      <circle cx="217" cy="223" r="2.2" fill="#FFF" />
      <circle cx="305" cy="223" r="2.2" fill="#FFF" />
      <ellipse cx="190" cy="248" rx="12" ry="7" fill="#F7B6A9" opacity="0.8" />
      <ellipse cx="328" cy="248" rx="12" ry="7" fill="#F7B6A9" opacity="0.8" />
      <path d="M234 249c7 14 22 19 31 19 11 0 24-6 30-19" fill="none" stroke="#ED917C" strokeWidth="7" strokeLinecap="round" />
      <path d="M246 259c5 5 12 7 19 7 7 0 13-2 18-7" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />

      {/* Sparkles and a tiny heart */}
      <path d="m161 87 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill="#ED917C" />
      <path d="M370 310c-7-8-20-1-14 9 4 7 14 13 14 13s10-6 14-13c6-10-7-17-14-9Z" fill="#ED917C" />
    </svg>
  );
}
