# 資安說明

## 前端（Vite）環境變數

- **`VITE_SUPABASE_URL`**、**`VITE_SUPABASE_ANON_KEY`**：設計上可出現在瀏覽器，屬 **公開 anon key**。資料保護依賴 **Row Level Security (RLS)** 與使用者 **JWT**，不是依賴隱藏網址。
- **禁止** 將以下任一項以前綴 `VITE_` 或任何方式打包進前端：
  - `SUPABASE_SERVICE_ROLE_KEY`（可繞過 RLS，等同後門）
  - `OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、WordPress 密碼、第三方付費 API Secret

## LLM 與付費 API

- 僅能放在 **Supabase Edge Function Secrets**、自建後端環境變數，或 CI 秘密庫。
- 本專案提供範例：`supabase/functions/generate-draft/`。部署後以 `supabase secrets set OPENAI_API_KEY=...` 設定。

## 資料庫遷移

- 執行 `supabase/migrations/20260211120000_init_profiles_articles.sql`（Dashboard SQL Editor 或 `supabase db push`）後，`articles` 僅允許 `auth.uid() = user_id` 的列存取。

## 開發伺服器

- 已將 **Vite** 升至 **6.4.2+** 以修補已知 dev server 相關 CVE；正式環境仍應使用建置產物 `dist`，勿將生產資料暴露於本機 dev。

## Edge Function CORS

- 範例 `generate-draft` 使用 `Access-Control-Allow-Origin: *` 以利開發；上線建議改為固定網域（例如環境變數 `SITE_URL`）。

## 重設密碼（Auth Email）

- 在 Supabase → **Authentication → URL configuration** 加入：
  - `http://localhost:5173/reset-password`（本機）
  - 正式站：`https://你的網域/reset-password`
- 與 **Redirect URLs** 一致，重設信內連結才能正確開啟 [`ResetPasswordPage`](src/app/auth/ResetPasswordPage.tsx)。
