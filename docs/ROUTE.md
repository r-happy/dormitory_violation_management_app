# フロントエンドルート一覧

Next.js 16 App Routerを使用したフロントエンドのルート構成です。

## 概要

- **ユーザーロール**: 寮職員（DormitoryStaff）、学生（Student）、教員（Teacher）
- **認証方式**: Server Actions + httpOnly cookies
- **総ルート数**: 26ルート

---

## 共通ルート

### `/`
- **説明**: アプリケーションのホームページ
- **認証**: 不要
- **レンダリング**: Static

### `/_not-found`
- **説明**: 404エラーページ
- **認証**: 不要
- **レンダリング**: Static

---

## 寮職員（DormitoryStaff）ルート

### 認証関連

#### `/dormitoryStaff/login`
- **説明**: 寮職員ログインページ
- **認証**: 不要（未ログイン）
- **機能**: 
  - メール・パスワード認証
  - "ログイン状態を保持する"オプション
  - Server Actionによる認証処理
- **リダイレクト先**: `/dormitoryStaff/dashboard`
- **レンダリング**: Static
- **関連API**: 未実装（現在はモックトークン使用）

#### `/dormitoryStaff/signup`
- **説明**: 寮職員新規登録ページ
- **認証**: 不要（未ログイン）
- **機能**:
  - 名前、メール、パスワード入力
  - パスワード確認
  - 登録後自動ログイン
- **リダイレクト先**: `/dormitoryStaff/dashboard`
- **レンダリング**: Static
- **関連API**: `POST /domitoryStaffs` (API.md 18行目)

### ダッシュボード

#### `/dormitoryStaff/dashboard`
- **説明**: 寮職員ダッシュボード
- **認証**: 必要（DormitoryStaff）
- **機能**: メイン画面（実装予定）
- **レンダリング**: Static

### 学生管理

#### `/dormitoryStaff/students`
- **説明**: 学生管理トップページ
- **認証**: 必要（DormitoryStaff）
- **レンダリング**: Static
- **関連API**: `GET /students` (API.md 4行目)

#### `/dormitoryStaff/students/list`
- **説明**: 学生一覧ページ
- **認証**: 必要（DormitoryStaff）
- **機能**: 学生の検索・フィルタリング
- **レンダリング**: Static
- **関連API**: `GET /students?name={name}&sexId={sexId}` (API.md 4行目)

#### `/dormitoryStaff/students/new`
- **説明**: 新規学生登録ページ
- **認証**: 必要（DormitoryStaff）
- **機能**: 学生情報の新規登録
- **レンダリング**: Static
- **関連API**: `POST /students` (API.md 3行目)

#### `/dormitoryStaff/students/upload`
- **説明**: 学生データ一括アップロードページ
- **認証**: 必要（DormitoryStaff）
- **機能**: CSVなどでの一括登録
- **レンダリング**: Static

#### `/dormitoryStaff/students/[student_id]`
- **説明**: 学生詳細・編集ページ
- **認証**: 必要（DormitoryStaff）
- **機能**: 
  - 学生情報の閲覧
  - 学生情報の更新
  - 学生の削除
- **レンダリング**: Dynamic
- **関連API**: 
  - `GET /students/{userId}` (API.md 5行目)
  - `PUT /students/{userId}` (API.md 6行目)
  - `DELETE /students/{userId}` (API.md 7行目)

### 申請管理

#### `/dormitoryStaff/applications`
- **説明**: 学生からの申請一覧
- **認証**: 必要（DormitoryStaff）
- **機能**: 申請の確認・承認
- **レンダリング**: Static

### 寮食管理

#### `/dormitoryStaff/menu`
- **説明**: 寮食メニュー管理
- **認証**: 必要（DormitoryStaff）
- **機能**: メニューの登録・編集
- **レンダリング**: Static

---

## 学生（Student）ルート

### 認証関連

#### `/student/login`
- **説明**: 学生ログインページ
- **認証**: 不要（未ログイン）
- **機能**: 
  - メール・パスワード認証
  - "ログイン状態を保持する"オプション
  - Server Actionによる認証処理
- **リダイレクト先**: `/student/dashboard`
- **レンダリング**: Static
- **関連API**: 未実装（現在はモックトークン使用）

#### `/student/signup`
- **説明**: 学生新規登録ページ
- **認証**: 不要（未ログイン）
- **機能**:
  - 名前、メール、パスワード入力
  - パスワード確認
  - 登録後自動ログイン
- **リダイレクト先**: `/student/dashboard`
- **レンダリング**: Static
- **関連API**: `POST /students` (API.md 3行目)
- **注**: 現在はname/email/passwordのみ。sexId, classIdの追加が必要

### ダッシュボード

#### `/student/dashboard`
- **説明**: 学生ダッシュボード
- **認証**: 必要（Student）
- **機能**: メイン画面（実装予定）
- **レンダリング**: Static

### 申請管理

#### `/student/applications`
- **説明**: 申請管理トップページ
- **認証**: 必要（Student）
- **レンダリング**: Static

#### `/student/applications/list`
- **説明**: 申請履歴一覧
- **認証**: 必要（Student）
- **機能**: 過去の申請履歴の閲覧
- **レンダリング**: Static

#### `/student/applications/new`
- **説明**: 新規申請トップページ
- **認証**: 必要（Student）
- **機能**: 申請タイプの選択
- **レンダリング**: Static

#### `/student/applications/new/volunteer`
- **説明**: ボランティア申請ページ
- **認証**: 必要（Student）
- **機能**: ボランティア活動の申請
- **レンダリング**: Static

#### `/student/applications/new/appeal`
- **説明**: 異議申し立てページ
- **認証**: 必要（Student）
- **機能**: 違反履歴への異議申し立て
- **レンダリング**: Static

#### `/student/applications/new/appeal/[history_id]`
- **説明**: 特定違反への異議申し立てページ
- **認証**: 必要（Student）
- **機能**: 特定の違反記録に対する異議申し立て
- **レンダリング**: Dynamic
- **関連API**: `GET /violations/{violationId}` (API.md 10行目)

### その他

#### `/student/duty`
- **説明**: 当番・役割管理
- **認証**: 必要（Student）
- **機能**: 当番スケジュールの確認
- **レンダリング**: Static

#### `/student/history`
- **説明**: 違反履歴の閲覧
- **認証**: 必要（Student）
- **機能**: 自分の違反履歴の確認
- **レンダリング**: Static
- **関連API**: `GET /violations?userId={userId}` (API.md 9行目)

#### `/student/menu`
- **説明**: 寮食メニュー閲覧
- **認証**: 必要（Student）
- **機能**: 今週・来週のメニュー確認
- **レンダリング**: Static

---

## 教員（Teacher）ルート

### 認証関連

#### `/teacher/login`
- **説明**: 教員ログインページ
- **認証**: 不要（未ログイン）
- **機能**: 
  - メール・パスワード認証
  - "ログイン状態を保持する"オプション
  - Server Actionによる認証処理
- **リダイレクト先**: `/teacher/dashboard`
- **レンダリング**: Static
- **関連API**: 未実装（現在はモックトークン使用）

#### `/teacher/signup`
- **説明**: 教員新規登録ページ
- **認証**: 不要（未ログイン）
- **機能**:
  - 名前、メール、パスワード入力
  - パスワード確認
  - 登録後自動ログイン
- **リダイレクト先**: `/teacher/dashboard`
- **レンダリング**: Static
- **関連API**: `POST /classTeachers` (API.md 23行目)
- **注**: 現在はname/email/passwordのみ。classフィールドの追加が必要

### ダッシュボード

#### `/teacher/dashboard`
- **説明**: 教員ダッシュボード
- **認証**: 必要（Teacher）
- **機能**: メイン画面、クラス管理
- **レンダリング**: Static

### 学生管理

#### `/teacher/[student_id]`
- **説明**: 学生詳細閲覧ページ
- **認証**: 必要（Teacher）
- **機能**: 担当クラスの学生情報閲覧
- **レンダリング**: Dynamic
- **関連API**: `GET /students/{userId}` (API.md 5行目)

---

## 技術仕様

### 認証方式
- **方式**: Server Actions + httpOnly cookies
- **セッション管理**: Cookie-based
- **Remember Me**: 30日間（チェックあり）/ 1日間（チェックなし）
- **Cookie設定**:
  - `httpOnly: true` (XSS対策)
  - `secure: true` (本番環境のみHTTPS)
  - `sameSite: 'lax'` (CSRF対策)

### フォームバリデーション
- **ライブラリ**: Zod + React Hook Form (一部)
- **バリデーション箇所**: サーバーサイド（Server Actions内）
- **エラー表示**: フィールドごとのエラーメッセージ

### UIコンポーネント
- **ライブラリ**: shadcn/ui
- **スタイリング**: TailwindCSS
- **アイコン**: lucide-react

### レンダリング方式
- **Static (○)**: ビルド時にプリレンダリング（26ルート中24ルート）
- **Dynamic (ƒ)**: リクエスト時にサーバーレンダリング（2ルート）

---

## 今後の実装予定

### 認証API統合
- [ ] ログインAPIエンドポイントの実装・統合
- [ ] トークンリフレッシュの実装
- [ ] ログアウト機能の実装

### フォーム追加フィールド
- [ ] Student signup: sexId, classId フィールド追加
- [ ] Teacher signup: class フィールド追加

### ページ実装
- [ ] 各ダッシュボードページの詳細実装
- [ ] 申請フローの完全実装
- [ ] 違反管理UIの実装

### セキュリティ
- [ ] 認証ミドルウェアの実装
- [ ] ロールベースアクセス制御（RBAC）
- [ ] CSRF対策の強化

---

## API対応表

| フロントエンドルート | 関連APIエンドポイント | HTTPメソッド | 認証ロール |
|---------------------|---------------------|-------------|-----------|
| `/dormitoryStaff/signup` | `/domitoryStaffs` | POST | - |
| `/student/signup` | `/students` | POST | - |
| `/teacher/signup` | `/classTeachers` | POST | - |
| `/dormitoryStaff/students/list` | `/students` | GET | DormitoryStaff |
| `/dormitoryStaff/students/new` | `/students` | POST | DormitoryStaff |
| `/dormitoryStaff/students/[id]` | `/students/{userId}` | GET/PUT/DELETE | DormitoryStaff |
| `/teacher/[student_id]` | `/students/{userId}` | GET | Teacher |
| `/student/applications/new/appeal/[history_id]` | `/violations/{violationId}` | GET | Student |

詳細は [API.md](./API.md) を参照してください。
