import pool from '../database/connect/mariadb';
import mybatisMapper from 'mybatis-mapper';

// MyBatis Mapper 초기화
mybatisMapper.createMapper(['./mapper/user.xml']);

export const gfSelectUser = async <T>(
  params: { userId: string; password?: string },
  payload: T
) => {
  const connection = await pool.getConnection();
  try {
    // 쿼리 생성
    const query = mybatisMapper.getStatement('UserMapper', 'selectUser', {
      ...params,
    });
    //console.log(`${query}`);
    payload = await connection.query(query);
    return payload;
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    if (connection) {
      connection.release(); // 연결 반환
    }
  }
};
