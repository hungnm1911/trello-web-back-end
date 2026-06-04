/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { env } from '~/config/environment.js'

import { MongoClient, ServerApiVersion } from 'mongodb'

// khởi tạo đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa kết nối đến cơ sở dữ liệu)
let trelloDatabaseInstance = null

// Khởi tạo đối tượng mongoClientInstance để kết nối đến MongoDB bằng URI và cấu hình server API
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối tới Database
export const CONNECT_DB = async () => {
  try {
    // Kết nối đến MongoDB Atlas với URI đã khai báo trong mongoClientInstance
    await mongoClientInstance.connect()
    console.log('Connected to MongoDB successfully!')

    // kết nối thành công thì lấy ra Database theo tên và gãn ngược lại vào biến trelloDatabaseInstance
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

// Function GET_DB (không async) có nhiệm vụ export ra cái Trello Database Insstance sau khi đã kết nối thành công để sử dụng nhiều nơi khác nhau trong code
// Lưu ý phải đảm bảo luôn gọi getDB này sau khi kết nối thành công với CONNECT_DB, nếu không sẽ bị lỗi vì trelloDatabaseInstance vẫn là null
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Database not connected. Please call CONNECT_DB first.')
  }
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  try {
    console.log('Closing MongoDB connection...')
    await mongoClientInstance.close()
  } catch (error) {
    console.error('Error closing MongoDB connection:', error)
    throw error
  }
}