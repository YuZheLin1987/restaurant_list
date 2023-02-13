# restaurant_list

![截圖 2023-02-13 下午11 45 40（2）](https://user-images.githubusercontent.com/113798606/218505685-73df9efb-e2d0-4fc9-b06d-1179ad3da85d.png)

## 功能
+ 瀏覽全部餐廳列表
+ 瀏覽單一餐廳詳細資料
+ 可使用餐廳名稱或餐廳類別來搜尋餐廳
+ 可以新增、修改、刪除餐廳資料
+ 餐廳排序功能(名稱、類別、地址)
+ 登入系統可建立自己的帳號
+ 可使用臉書帳號做第三方登入

## 開始使用

1. 請先安裝node.js以及npm
2. 將專案複製到本地
3. 使用終端機進入資料夾的位置，安裝相關套件
```
npm install
```
4. 設定環境變數
  + 在資料夾新增.env檔案
  + MACos可直接建立檔案。WINDOWSos存檔時檔案類型請選擇 **所有檔案 / ALL FILES** ，避免建立成文字檔txt
  + 內容請參考.env.example，填入SKIP的部份
  + MONGODB_URI 請輸入您的mongodb連線網址
  + FACEBOOK 相關請到Facebook for developers 註冊應用程式，開啟登入功能。取得編號(FACEBOOK_ID)及密鑰(FACEBOOK_SECRET)
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
+ Method-override@3.0.0
+ dotenv@16.0.3
+ Eexpress-session@1.17.1
+ Passport@0.4.1
+ Passport-facebook@3.0.0
+ Passport-local@1.0.0
+ Connect-flash@0.1.1
+ Bcryptjs@2.4.3
