views/
├── layouts/ (存放共用的 HTML 骨架)
│ └── main.ejs (包含 <head>, 導覽列, 頁尾)
├── partials/ (存放可重複利用的小元件)
│ ├── navbar.ejs
│ ├── footer.ejs
│ └── map_svg.ejs (例如你的地圖區塊可以獨立出來)
├── pages/ (按功能模組分資料夾)
│ ├── index.ejs (首頁)
│ ├── news/ (最新消息模組)
│ │ ├── list.ejs
│ │ └── content.ejs
│ ├── menu/ (嘗美食模組)
│ │ ├── list.ejs
│ │ └── detail.ejs
│ └── shop/ (找門市模組)
│ └── booking.ejs
└── error.ejs (404 或錯誤頁面)
