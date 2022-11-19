# restaurant_list

![截圖 2022-11-19 下午5 12 05（2）](https://user-images.githubusercontent.com/113798606/202843875-0a7153de-cf15-4418-96ca-f39cfd10d854.png)

## 功能
+ 瀏覽全部餐廳列表
+ 瀏覽單一餐廳詳細資料
+ 可使用餐廳名稱或餐廳類別來搜尋餐廳
+ 可以新增餐廳資料
+ 可以修改餐廳資料
+ 可以刪除餐廳資料

## 開始使用

1. 請先安裝node.js以及npm
2. 將專案複製到本地
3. 使用終端機進入資料夾的位置，安裝相關套件
```
npm install
```
4. 設定MONGODB環境變數
  + 在資料夾新增.env檔案
  + 檔案寫入下面內容
```
MONGODB_URI="你的MongoDB連接字串"
```
  + MACOS可直接建立檔案。WINDOWOS存擋時檔案類型請選擇 **所有檔案 / ALL FILES** ，避免建立成文字檔txt。
5. 寫入種子資料
```
npm run seed
```

6. 執行程式
```
npm run start
```
7. 成功時終端機會顯示
```
This express server is running at http://localhost:3000
mongodb connected!
```
8. 到瀏覽器輸入下列網址：http://localhost:3000
9. 結束請在終端機輸入ctrl+c

## 使用工具
+ Node.js@16.17.1
+ Express@4.16.4
+ Express-handlebars@3.0.0
+ Bootstrap@5.2.1
+ FontAwesome@6.2.0
+ Mongoose@5.9.7
