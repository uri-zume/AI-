# 本番バックエンド接続
GitHub Pagesは秘密鍵を安全に保持できないため、本番化時はVercel + Supabaseへ移行します。

- Supabase: Auth、PostgreSQL、Row Level Security、証明書Storage
- Stripe Checkout: 決済Sessionはサーバー関数で作成し、Webhookで支払済みを確定
- OpenAI Responses API: 記述回答はサーバー関数から送信し、Structured Outputsで採点JSONを返す
- PDF: サーバー側で認定番号と検証URLを埋め込み、Storageへ保存

`schema.sql` をSupabase SQL Editorで実行し、環境変数をサーバー側だけに設定してください。APIキーをHTMLやJavaScriptへ直接書かないでください。
