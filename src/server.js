/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb.js'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment.js'

const START_SERVER = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.end(`Hello ${env.AUTHOR}, I am running at /`)
  })

  app.listen(env.APP_PORT, env.APP_HOST, async () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello '${env.AUTHOR}', I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server bằng bất cứ thao tác nào
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Atlas!!!')
  })
}

// Chỉ khi kết nối tới DB thành công thì mới Start server back-end lên
(async () => {
  try {
    console.log('1. Connecting to MongoDB Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!!!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(1) // thoát chương trình với mã lỗi 1 nếu có lỗi xảy ra trong quá trình kết nối hoặc khởi động server
  }
})()

// // Chỉ khi kết nối tới DB thành công thì mới Start server back-end lên
// console.log('1. Connecting to MongoDB Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlas!!!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(1) // thoát chương trình với mã lỗi 1 nếu có lỗi xảy ra trong quá trình kết nối hoặc khởi động server
//   })


// L : Khi chạy yarn dev, code luôn chạy từ file server.js này đầu tiên \
// => chỉ cần import module cần thiết (ví dụ dotenv) vào đây thì toàn bộ project sẽ có thể sử dụng được rồi, không cần phải import lại ở những file khác nữa