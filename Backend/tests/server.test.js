const request = require('supertest');
const express = require('express');
const app = require('../server');  // Import your Express app

// Mock data
let cartStore = {};
let orderStore = [];
let discountCodes = [];
let orderCount = 0;
const nthOrder = 3;

describe('Ecommerce API', () => {
  
  // Test the Add to Cart API
  describe('POST /cart/add', () => {
    it('should add items to the cart', async () => {
      const res = await request(app)
        .post('/cart/add')
        .send({
          user_id: 'user1',
          item_id: 'item123',
          quantity: 2
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Item added to cart');
    });

    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/cart/add')
        .send({
          user_id: 'user1',
          item_id: 'item123'
        });  // Missing quantity field
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Invalid input');
    });
  });

  // Test the Checkout API
  describe('POST /checkout', () => {
    it('should successfully checkout and return total', async () => {
      const res = await request(app)
        .post('/checkout')
        .send({
          user_id: 'user1'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.total).toBe(20);  // Assuming 2 items * $10 each
    });

    it('should return error for empty cart', async () => {
      const res = await request(app)
        .post('/checkout')
        .send({
          user_id: 'user2'
        });  // Cart is empty for user2
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Cart is empty or invalid user');
    });
  });

  // Test the Admin Discount Code Generation API
  describe('POST /admin/generate-discount', () => {
    it('should generate a new discount code', async () => {
      const res = await request(app)
        .post('/admin/generate-discount');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.code).toMatch(/DISC\d{4}/);  // Check if code format is DISCxxxx
    });
  });

  // Test the Admin Report API
  describe('GET /admin/report', () => {
    it('should return the report', async () => {
      const res = await request(app)
        .get('/admin/report');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.total_items_sold).toBeDefined();
      expect(res.body.total_revenue).toBeDefined();
      expect(res.body.total_discount_given).toBeDefined();
    });
  });

});
