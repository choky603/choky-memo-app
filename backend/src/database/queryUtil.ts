import pool from '../database/connect/mariadb';

export const gfQuerySelect = async <T>(sql: string, payload: T) => {
  let connection;
  try {
    connection = await pool.getConnection();
    payload = await connection.query(sql);
    return payload;
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    if (connection) {
      connection.release(); // 연결 반환
    }
  }
};
