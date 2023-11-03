# ITSS-back-end

## Hướng dẫn set up và chạy server:

### B1: Clone repo về máy
### B2: Chạy command `node -v` để kiểm tra phiên bản của nodejs  
  - Nếu máy đã có nodejs rồi thì qua bước 3 <br />
  - Nếu máy chưa có nodejs thì tải phiên bản mới nhất ở `https://nodejs.org/en`, rồi qua bước bước 3 <br />
  - Nếu gặp vấn đề với node thì cài đặt NVM (https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
    - Sau đó cài đặt phiên bản node 16.15.1 với command `nvm install 16.15.1`
### B3: Chạy server với command `npm start`

## Hướng dẫn thao tác với repo, code, push, tạo pull request:
### B1: Trước mỗi lần bắt đầu code, chạy command `git pull origin main` để pull code mới được merge vào branch main (code mới nhất)
### B2: Dùng command `git branch` để kiểm tra xem đang ở branch nào
  - Nếu đang không ở branch của mình thì checkout qua bằng command `git checkout` + branchname
  - Nếu chưa có branch thì tạo branch mới bằng command `git branch` + branchname
    - Sau đó dùng command `git checkout` + branchname để chuyển qua branch mới tạo
### B3: Sau khi code xong, commit và push như bình thường lên branch của mình
### B4: Lên repo trên web, chọn branch của mình
      ![image](https://github.com/quyld17/ITSS-back-end/assets/75574584/c4da09f5-b979-4a46-89d7-f2bb8688e33e)
### B5: Chọn commit và tạo pull request
