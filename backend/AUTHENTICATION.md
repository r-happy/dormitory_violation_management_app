# 認証機能ドキュメント

## 概要
JWT（JSON Web Token）を使用した認証機能とロールベースのアクセス制御（RBAC）を実装しました。

## ユーザーロール

システムには3つのロールがあります：

1. **Student（生徒）**
   - 自分のデータのみ閲覧可能
   - 違反理由の閲覧が可能

2. **ClassTeacher（担任教師）**
   - 生徒情報の閲覧
   - 違反情報の作成・閲覧・更新・削除
   - 違反理由の閲覧
   - 寮スタッフ情報の閲覧
   - 担任教師情報の閲覧

3. **DomitoryStaff（寮スタッフ）**
   - すべてのリソースへのフルアクセス
   - 生徒、違反、理由、スタッフ、教師の作成・更新・削除

## 認証エンドポイント

### ユーザー登録
```
POST /auth/register
```

**リクエストボディ:**
```json
{
  "username": "string",
  "password": "string",
  "role": "Student" | "ClassTeacher" | "DomitoryStaff",
  "relatedId": number (optional)
}
```

**レスポンス:**
```json
{
  "id": 1,
  "username": "user123",
  "role": "Student",
  "relatedId": 5
}
```

**relatedIdについて:**
- `Student`の場合: 対応するstudentのID
- `ClassTeacher`の場合: 対応するclassTeacherのID
- `DomitoryStaff`の場合: 対応するdomitoryStaffのID

### ログイン
```
POST /auth/login
```

**リクエストボディ:**
```json
{
  "username": "string",
  "password": "string"
}
```

**レスポンス:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user123",
    "role": "Student",
    "relatedId": 5
  }
}
```

## 認証の使用方法

### 1. ログインしてトークンを取得
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user123","password":"password123"}'
```

### 2. トークンを使用してAPIにアクセス
```bash
curl -X GET http://localhost:3000/students \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## アクセス権限マトリックス

### Students API
| エンドポイント       | Student      | ClassTeacher | DomitoryStaff |
| -------------------- | ------------ | ------------ | ------------- |
| POST /students       | ❌            | ❌            | ✅             |
| GET /students        | ❌            | ✅            | ✅             |
| GET /students/:id    | ✅ (自分のみ) | ✅            | ✅             |
| PUT /students/:id    | ❌            | ❌            | ✅             |
| DELETE /students/:id | ❌            | ❌            | ✅             |

### Violations API
| エンドポイント         | Student      | ClassTeacher | DomitoryStaff |
| ---------------------- | ------------ | ------------ | ------------- |
| POST /violations       | ❌            | ✅            | ✅             |
| GET /violations        | ❌            | ✅            | ✅             |
| GET /violations/:id    | ✅ (自分のみ) | ✅            | ✅             |
| PUT /violations/:id    | ❌            | ✅            | ✅             |
| DELETE /violations/:id | ❌            | ✅            | ✅             |

### Reasons API
| エンドポイント      | Student | ClassTeacher | DomitoryStaff |
| ------------------- | ------- | ------------ | ------------- |
| POST /reasons       | ❌       | ❌            | ✅             |
| GET /reasons        | ✅       | ✅            | ✅             |
| GET /reasons/:id    | ✅       | ✅            | ✅             |
| PUT /reasons/:id    | ❌       | ❌            | ✅             |
| DELETE /reasons/:id | ❌       | ❌            | ✅             |

### DomitoryStaffs API
| エンドポイント             | Student | ClassTeacher | DomitoryStaff |
| -------------------------- | ------- | ------------ | ------------- |
| POST /domitoryStaffs       | ❌       | ❌            | ✅             |
| GET /domitoryStaffs        | ❌       | ✅            | ✅             |
| GET /domitoryStaffs/:id    | ❌       | ✅            | ✅             |
| PUT /domitoryStaffs/:id    | ❌       | ❌            | ✅             |
| DELETE /domitoryStaffs/:id | ❌       | ❌            | ✅             |

### ClassTeachers API
| エンドポイント            | Student | ClassTeacher | DomitoryStaff |
| ------------------------- | ------- | ------------ | ------------- |
| POST /classTeachers       | ❌       | ❌            | ✅             |
| GET /classTeachers        | ❌       | ✅            | ✅             |
| GET /classTeachers/:id    | ❌       | ✅            | ✅             |
| PUT /classTeachers/:id    | ❌       | ❌            | ✅             |
| DELETE /classTeachers/:id | ❌       | ❌            | ✅             |

## セキュリティ設定

### JWT設定
- **シークレットキー**: 環境変数 `JWT_SECRET` で設定（デフォルト: 'your-secret-key-change-in-production'）
- **トークン有効期限**: 24時間
- **アルゴリズム**: HS256

### パスワードハッシュ
- **アルゴリズム**: bcrypt
- **ソルトラウンド**: 10

## 環境変数

`.env` ファイルを作成して以下の環境変数を設定してください：

```env
JWT_SECRET=your-very-secret-key-here
```

**重要**: 本番環境では必ず強力なシークレットキーを設定してください。

## 使用例

### 1. 寮スタッフユーザーを登録
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "staff001",
    "password": "securePassword123",
    "role": "DomitoryStaff",
    "relatedId": 1
  }'
```

### 2. ログイン
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "staff001",
    "password": "securePassword123"
  }'
```

レスポンス:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "staff001",
    "role": "DomitoryStaff",
    "relatedId": 1
  }
}
```

### 3. トークンを使用して生徒を作成
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "山田太郎",
    "sexId": 1,
    "classId": 1,
    "roomNumber": 101,
    "roleId": 1
  }'
```

## エラーレスポンス

### 401 Unauthorized
認証トークンが無効または期限切れ
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
権限不足
```json
{
  "statusCode": 403,
  "message": "Insufficient permissions"
}
```

## 実装詳細

### ファイル構成
```
src/
├── auth/
│   ├── auth.module.ts          # 認証モジュール
│   ├── auth.service.ts         # 認証サービス
│   ├── auth.controller.ts      # 認証コントローラー
│   └── jwt.strategy.ts         # JWT戦略
├── guards/
│   ├── jwt-auth.guard.ts       # JWT認証ガード
│   └── roles.guard.ts          # ロールガード
├── decorators/
│   ├── roles.decorator.ts      # ロール指定デコレーター
│   └── current-user.decorator.ts # 現在のユーザー取得デコレーター
├── entity/
│   └── user.entity.ts          # ユーザーエンティティ
└── dto/
    └── auth.dto.ts             # 認証DTO
```

### ガードの使用方法

コントローラーレベルでガードを適用:
```typescript
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  // ...
}
```

エンドポイントレベルでロールを指定:
```typescript
@Post()
@Roles(UserRole.DOMITORY_STAFF)
async addStudent(@Body() body: CreateStudentDto) {
  // ...
}
```

現在のユーザー情報を取得:
```typescript
@Get(':userId')
async getSpecifiedStudent(
  @Param('userId') userId: number,
  @CurrentUser() user: any,
) {
  // user.role, user.userId, user.relatedId が利用可能
}
```

## テスト

### Postmanコレクションの例

1. **Register User**
   - Method: POST
   - URL: `http://localhost:3000/auth/register`
   - Body: JSON

2. **Login**
   - Method: POST
   - URL: `http://localhost:3000/auth/login`
   - Body: JSON

3. **Get Students (認証必要)**
   - Method: GET
   - URL: `http://localhost:3000/students`
   - Headers: `Authorization: Bearer {{access_token}}`

## トラブルシューティング

### トークンが無効
- トークンの有効期限（24時間）を確認
- `Authorization` ヘッダーの形式を確認: `Bearer <token>`

### 権限エラー
- ユーザーのロールを確認
- アクセス権限マトリックスを参照

### パスワードが一致しない
- パスワードは bcrypt でハッシュ化されているため、データベースで直接確認できません
- ログイン機能を使用して確認してください
