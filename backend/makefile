db: 
	sqlite3 db/test.db < db/init.sql

dev:
	npm run start:dev

test:
	npm test

violation:
	npm test -- violation.spec.ts

student:
	npm test -- student.spec.ts

reason:
	npm test -- reason.spec.ts

domitory-staff:
	npm test -- domitory-staff.spec.ts

class-teacher:
	npm test -- class-teacher.spec.ts

run: db dev

.PHONY: run db dev test violation student reason domitory-staff class-teacher