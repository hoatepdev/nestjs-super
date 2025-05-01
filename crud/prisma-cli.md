## `npx prisma migrate dev`

- Tạo migration mới dựa trên các thay đổi trong model
- Apply migration mới nhất
- Tạo các type cho prisma client
- Tạo ra migration mới

## `npx prisma migrate reset`

- Xóa tất cả các migration và tạo lại cơ sở dữ liệu từ đầu

## `npx prisma migrate deploy`

- Áp dụng tất cả các migration chưa được áp dụng

## `npx prisma generate`

- Tạo các file code từ model

## `npx prisma db push`

- Cập nhật cơ sở dữ liệu dựa trên các thay đổi trong model
- Không tạo ra migration mới

## `npx prisma db pull`

- Cập nhật model dựa trên cơ sở dữ liệu

## `npx prisma db seed`

- Tạo dữ liệu mẫu cho cơ sở dữ liệu
