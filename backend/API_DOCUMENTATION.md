# 寮違反管理システム API

## 概要
このプロジェクトは、寮の違反管理を行うためのREST APIです。NestJS、TypeORM、SQLiteを使用して実装されています。

## 技術スタック
- **フレームワーク**: NestJS 11.x
- **ORM**: TypeORM 0.3.x
- **データベース**: SQLite
- **バリデーション**: class-validator, class-transformer
- **言語**: TypeScript 5.x

## プロジェクト構造
```
src/
├── controller/       # コントローラー（HTTPエンドポイント）
├── service/          # サービス（ビジネスロジック）
├── entity/           # エンティティ（データベースモデル）
├── dto/              # DTO（データ転送オブジェクト）
├── module/           # モジュール（依存性注入の設定）
└── main.ts           # アプリケーションエントリーポイント
```

## エンティティ

### Student（生徒）
- `id`: 主キー
- `name`: 名前
- `sexId`: 性別ID（外部キー）
- `classId`: クラスID（外部キー）
- `roomNumber`: 部屋番号
- `roleId`: ロールID（外部キー）

### Violation（違反）
- `id`: 主キー
- `point`: ポイント
- `reasonId`: 理由ID（外部キー）
- `userId`: ユーザーID（外部キー）
- `date`: 日付

### Reason（違反理由）
- `id`: 主キー
- `name`: 理由名
- `point`: ポイント

### DomitoryStaff（寮スタッフ）
- `id`: 主キー
- `name`: 名前

### ClassTeacher（担任教師）
- `id`: 主キー
- `name`: 名前
- `classId`: クラスID（外部キー）

### Sex（性別マスター）
- `id`: 主キー
- `name`: 性別名

### Class（クラスマスター）
- `id`: 主キー
- `name`: クラス名

### Role（ロールマスター）
- `id`: 主キー
- `name`: ロール名

## セットアップ

### 依存関係のインストール
```bash
npm install
```

### 開発サーバーの起動
```bash
npm run start:dev
```

サーバーは `http://localhost:3000` で起動します。

### ビルド
```bash
npm run build
```

### 本番環境での起動
```bash
npm run start:prod
```

## API エンドポイント

### Students（生徒）

#### 生徒を作成
- **POST** `/students`
- **認証**: DomitoryStaff
- **リクエストボディ**:
```json
{
  "name": "string",
  "sexId": number,
  "classId": number,
  "roomNumber": number,
  "roleId": number
}
```
- **レスポンス**: 201 Created

#### 生徒一覧を取得
- **GET** `/students?name=&sexId=&classId=&roomNumber=&point=`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 200 OK

#### 特定の生徒を取得
- **GET** `/students/:userId`
- **認証**: ClassTeacher, DomitoryStaff, Student (self only)
- **レスポンス**: 200 OK

#### 生徒を更新
- **PUT** `/students/:userId`
- **認証**: DomitoryStaff
- **リクエストボディ**: 作成時と同じ
- **レスポンス**: 200 OK

#### 生徒を削除
- **DELETE** `/students/:userId`
- **認証**: DomitoryStaff
- **レスポンス**: 204 No Content

### Violations（違反）

#### 違反を作成
- **POST** `/violations`
- **認証**: ClassTeacher, DomitoryStaff
- **リクエストボディ**:
```json
{
  "point": number,
  "reasonId": number,
  "userId": number,
  "date": "YYYY-MM-DD"
}
```
- **レスポンス**: 201 Created

#### 違反一覧を取得
- **GET** `/violations?point=&reasonId=&userId=&fromDate=&toDate=`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 200 OK

#### 特定の違反を取得
- **GET** `/violations/:violationId`
- **認証**: ClassTeacher, DomitoryStaff, Student (self only)
- **レスポンス**: 200 OK

#### 違反を更新
- **PUT** `/violations/:violationId`
- **認証**: ClassTeacher, DomitoryStaff
- **リクエストボディ**: 作成時と同じ
- **レスポンス**: 200 OK

#### 違反を削除
- **DELETE** `/violations/:violationId`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 204 No Content

### Reasons（違反理由）

#### 理由を作成
- **POST** `/reasons`
- **認証**: DomitoryStaff
- **リクエストボディ**:
```json
{
  "name": "string",
  "point": number
}
```
- **レスポンス**: 201 Created

#### 理由一覧を取得
- **GET** `/reasons?name=&point=`
- **認証**: ClassTeacher, DomitoryStaff, Student
- **レスポンス**: 200 OK

#### 特定の理由を取得
- **GET** `/reasons/:reasonId`
- **認証**: ClassTeacher, DomitoryStaff, Student
- **レスポンス**: 200 OK

#### 理由を更新
- **PUT** `/reasons/:reasonId`
- **認証**: DomitoryStaff
- **リクエストボディ**: 作成時と同じ
- **レスポンス**: 200 OK

#### 理由を削除
- **DELETE** `/reasons/:reasonId`
- **認証**: DomitoryStaff
- **レスポンス**: 204 No Content

### DomitoryStaffs（寮スタッフ）

#### スタッフを作成
- **POST** `/domitoryStaffs`
- **認証**: DomitoryStaff
- **リクエストボディ**:
```json
{
  "name": "string"
}
```
- **レスポンス**: 201 Created

#### スタッフ一覧を取得
- **GET** `/domitoryStaffs?name=`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 200 OK

#### 特定のスタッフを取得
- **GET** `/domitoryStaffs/:domitoryStaffId`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 200 OK

#### スタッフを更新
- **PUT** `/domitoryStaffs/:domitoryStaffId`
- **認証**: DomitoryStaff
- **リクエストボディ**: 作成時と同じ
- **レスポンス**: 200 OK

#### スタッフを削除
- **DELETE** `/domitoryStaffs/:domitoryStaffId`
- **認証**: DomitoryStaff
- **レスポンス**: 204 No Content

### ClassTeachers（担任教師）

#### 教師を作成
- **POST** `/classTeachers`
- **認証**: DomitoryStaff
- **リクエストボディ**:
```json
{
  "name": "string",
  "classId": number
}
```
- **レスポンス**: 201 Created

#### 教師一覧を取得
- **GET** `/classTeachers?name=&classId=`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 200 OK

#### 特定の教師を取得
- **GET** `/classTeachers/:classTeacherId`
- **認証**: ClassTeacher, DomitoryStaff
- **レスポンス**: 200 OK

#### 教師を更新
- **PUT** `/classTeachers/:classTeacherId`
- **認証**: DomitoryStaff
- **リクエストボディ**: 作成時と同じ
- **レスポンス**: 200 OK

#### 教師を削除
- **DELETE** `/classTeachers/:classTeacherId`
- **認証**: DomitoryStaff
- **レスポンス**: 204 No Content

## エラーレスポンス

### 400 Bad Request
リクエストのバリデーションエラー

### 401 Unauthorized
認証が必要

### 403 Forbidden
権限がない

### 404 Not Found
リソースが見つからない

## 開発

### コードフォーマット
```bash
npm run format
```

### リント
```bash
npm run lint
```

### テスト
```bash
npm test
```

## 注意事項
- 現在、認証機能は実装されていません。design.mdに記載されている認証要件は今後実装する必要があります。
- データベースは開発環境ではSQLiteを使用していますが、本番環境では適切なデータベースに変更することを推奨します。
- `synchronize: true` は開発環境のみで使用し、本番環境では必ず `false` に設定してください。
