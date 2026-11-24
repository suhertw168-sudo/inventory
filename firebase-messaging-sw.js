/* 盤點工具的推播 Service Worker
   ------------------------------------------------------------------
   這個檔案只做一件事：讓手機在「工具沒開著、甚至鎖屏」時也收得到通知。
   它「刻意不做任何快取」，不攔截一般網頁請求，所以上傳新版 index.html 之後，
   同仁的手機不會卡在舊版本。
   檔案要跟 index.html 放在同一層（.../inventory/firebase-messaging-sw.js）。 */

importScripts('https://www.gstatic.com/firebasejs/13.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/13.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBOsZKGSVr6OWmcOjTftWFyX9_9ODg4blY",
  authDomain: "inventory-push-996ee.firebaseapp.com",
  projectId: "inventory-push-996ee",
  storageBucket: "inventory-push-996ee.firebasestorage.app",
  messagingSenderId: "979020180890",
  appId: "1:979020180890:web:08cc8c3ced8edfd2885e23"
});

// 取得 messaging 實例後，SDK 會自己接管推播事件並顯示通知。
// 後端送的是帶 notification 的訊息，瀏覽器會直接顯示，這裡不用再自己畫一次，
// 否則同一則通知會跳兩個。
firebase.messaging();

// 裝好之後立刻接手，不用等所有分頁關掉再開
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(event){ event.waitUntil(self.clients.claim()); });
