## CRUD設計
カテゴリ	使用エンティティ	HTTPメソッド	パス	認証	エンドポイント名	クエリ	リクエストボディ	レスポンス	ステータスコード
データベース操作	Student	POST	/students	DomitoryStaff	addStudent	なし	name: string, sexId: number, classId: number, room_number: number, roleId: number	作成されたjson	201: Created, 400: Validation Error, 401: Unauthorized, 403: Forbidden
データベース操作	Student	GET	/students	ClassTeacher, DomitoryStaff	getStudents	name?: string, sexId?: number, classId?: number, roomNumber?: number, point?: number	なし	取得したjsonの配列	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden
データベース操作	Student	GET	/students/{userId}	ClassTeacher, DomitoryStaff, Student (self only)	getSpecifiedStudent	なし	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Student	PUT	/students/{userId}	DomitoryStaff	updateStudent	なし	name: string, sexId: number, classId: number, room_number: number, roleId: number	更新されたデータのjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Student	DELETE	/students/{userId}	DomitoryStaff	deleteStudent	なし	なし	なし	204: No Content, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Violation	POST	/violations	ClassTeacher, DomitoryStaff	addViolation	なし	point: number, reasonId: number, userId: number, date: string	作成されたjson	201: Created, 400: Validation Error, 401: Unauthorized, 403: Forbidden
データベース操作	Violation	GET	/violations	ClassTeacher, DomitoryStaff	getViolations	point?: number, reasonId?: number, userId?: number, fromDate?: string (YYYY:MM:DD), toDate?: string (YYYY:MM:DD)	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden
データベース操作	Violation	GET	/violations/{violationId}	ClassTeacher, DomitoryStaff, Student (self only)	getSpecifiedViolation	なし	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Violation	PUT	/violations/{violationId}	ClassTeacher, DomitoryStaff	updateViolation	なし	point: number, reasonId: number, userId: number, date: string	更新されたデータのjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Violation	DELETE	/violations/{violationId}	ClassTeacher, DomitoryStaff	deleteViolation	なし	なし	なし	204: No Content, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Reason	POST	/reasons	DomitoryStaff	addReason	なし	name: string, point: number	作成されたjson	201: Created, 400: Validation Error, 401: Unauthorized, 403: Forbidden
データベース操作	Reason	GET	/reasons	ClassTeacher, DomitoryStaff, Student	getReasons	name?: string, point?: number	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden
データベース操作	Reason	GET	/reasons/{reasonId}	ClassTeacher, DomitoryStaff, Student	getSpecifiedReason	なし	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Reason	PUT	/reasons/{reasonId}	DomitoryStaff	updateReason	なし	name: string, point: number	更新されたデータのjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	Reason	DELETE	/reasons/{reasonId}	DomitoryStaff	deleteReason	なし	なし	なし	204: No Content, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	DomitoryStaff	POST	/domitoryStaffs	DomitoryStaff	addDomitoryStaff	なし	name: string	作成されたjson	201: Created, 400: Validation Error, 401: Unauthorized, 403: Forbidden
データベース操作	DomitoryStaff	GET	/domitoryStaffs	ClassTeacher, DomitoryStaff	getDomitoryStaffs	name?: string	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden
データベース操作	DomitoryStaff	GET	/domitoryStaffs/{domitoryStaffId}	ClassTeacher, DomitoryStaff	getSpecifiedDomitoryStaff	なし	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	DomitoryStaff	PUT	/domitoryStaffs/{domitoryStaffId}	DomitoryStaff	updateDomitorystaff	なし	name: string	更新されたデータのjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	DomitoryStaff	DELETE	/domitoryStaffs/{domitoryStaffId}	DomitoryStaff	deleteDomitoryStaff	なし	なし	なし	204: No Content, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	ClassTeacher	POST	/classTeachers	DomitoryStaff	addClassTeacher	なし	name: string, class: string	作成されたjson	201: Created, 400: Validation Error, 401: Unauthorized, 403: Forbidden
データベース操作	ClassTeacher	GET	/classTeachers	ClassTeacher, DomitoryStaff	getClassTeachers	name?: stromg, classId?: number	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden
データベース操作	ClassTeacher	GET	/classTeachers/{classTeacherId}	ClassTeacher, DomitoryStaff	getSpecifiedClassTeacher	なし	なし	取得したjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	ClassTeacher	PUT	/classTeachers/{classTeacherId}	DomitoryStaff	updateClassTeacher	なし	name: string, class: string	更新されたデータのjson	200: OK, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found
データベース操作	ClassTeacher	DELETE	/classTeachers/{classTeacherId}	DomitoryStaff	deleteClassTeacher	なし	なし	なし	204: No Content, 400: Bad Request, 401: Unauthorized, 403: Forbidden, 404: Not Found


## ルール
- エンティティごとにentityファイルとcontrollerファイルとserviceファイルを分ける。
- ディレクトリは現状のものを使用
- コメントは最小限で良い