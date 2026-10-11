import type { MouseEventHandler } from "react";

type BrandLogoProps = {
  footer?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function BeeToothMark({ footer = false }: { footer?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className="h-12 w-12 shrink-0">
      <circle cx="32" cy="32" r="31" fill={footer ? "#ffffff" : "#e9f5ff"} />
      <path d="M35 11c-7 0-11 5-10 12 .8 6 4 11 5 17 .9 6 2 12 5.5 12 3 0 4-11 7.5-11s4.5 11 7.5 11c3.7 0 5-7 6.5-13 1.3-6 4-12 2.4-19-1.1-5.5-5.7-8.5-10.7-8-4.4.4-7.8 3.1-10.7 2-1.1-.4-1.9-1-3-1Z" fill="#fdfefe" stroke="#354044" strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M41 25c2-2.3 4-2.3 6 0m6 0c2-2.3 4-2.3 6 0" fill="none" stroke="#354044" strokeWidth="2" strokeLinecap="round" />
      <path d="M47 33c2 3 5 3 8 0" fill="none" stroke="#df887b" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="16" cy="23" rx="6" ry="3.5" transform="rotate(-32 16 23)" fill="#fff" stroke="#354044" strokeWidth="1.8" />
      <ellipse cx="25" cy="20" rx="5.5" ry="3.2" transform="rotate(24 25 20)" fill="#fff7d6" stroke="#354044" strokeWidth="1.8" />
      <path d="M16 29c-.5-5 2-8 6-8s7 3 7 7-3 7-7 7-6-2-6-6Z" fill="#ffd457" stroke="#354044" strokeWidth="1.8" />
      <path d="M18 36c-5 2-7 7-5 11 2 4 6 5 10 3s5-7 3-11c-2-3-5-5-8-3Z" fill="#f6bf35" stroke="#354044" strokeWidth="1.8" />
      <path d="M17 37c2 1 3 3 4 5m-8 0c2 1 3 3 4 5" fill="none" stroke="#354044" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 25c1-2 1-3 0-4m4 4c2-1 3-2 3-4" fill="none" stroke="#354044" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="19" cy="29" r=".9" fill="#354044" /><circle cx="25" cy="28" r=".9" fill="#354044" />
    </svg>
  );
}

export default function BrandLogo({ footer = false, onClick }: BrandLogoProps) {
  return (
    <a href="#anasayfa" onClick={onClick} className="group inline-flex items-center gap-2.5" aria-label="BalDent Çocuk Diş Kliniği ana sayfa">
      <BeeToothMark footer={footer} />
      <span className="leading-none">
        <span className={`block font-rounded text-[23px] font-black leading-[0.96] tracking-[-0.06em] ${footer ? "text-white" : "text-[#438fbd]"}`}>BalDent</span>
        <span className={`mt-1.5 block whitespace-nowrap font-rounded text-[9px] font-black tracking-[0.08em] ${footer ? "text-mint-300" : "text-[#278d99]"}`}>ÇOCUK DİŞ KLİNİĞİ</span>
      </span>
    </a>
  );
}
