import request from "supertest";
import app from '../src/app';

describe('UserController', () => {
  
    it('should log in a user', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'sagdinov.a@yandex.ru', password: 'Paralaxx99' });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });
  
    it('should register a user', async () => {
      const response = await request(app)
        .post('/api/users/registration')
        .send({ email: 'newuser@example.com', password: 'newpassword', name: 'New User' });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });
    it('should get a user by ID', async () => {
      // Предположим, что у вас есть ID существующего пользователя
      const userId = '12345';
  
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', 'Bearer your-access-token'); // Установите токен аутентификации, если требуется
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });
  
    // Другие тесты для остальных методов UserController
  
  });