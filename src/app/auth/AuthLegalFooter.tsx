/** MVP：請於上線前改為你的實際法務頁網址 */
export function AuthLegalFooter() {
  return (
    <p className="mt-8 text-center text-[11px] text-muted-foreground leading-relaxed px-2">
      繼續使用前請自行備妥服務條款與隱私權政策；此處為占位連結，上線前請替換。
      <span className="block mt-1">
        <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-link underline">
          隱私權（占位）
        </a>
        <span className="mx-1.5 text-border">|</span>
        <a href="https://supabase.com/terms" target="_blank" rel="noopener noreferrer" className="text-brand-link underline">
          條款（占位）
        </a>
      </span>
    </p>
  );
}
