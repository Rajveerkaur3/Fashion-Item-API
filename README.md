# Fashion-Item-API

## Project Overview:
The Fashion Item API is a RESTful API that allows to manage fashion items, discounts, and brands for an online store.
The API supports standard CRUD (Create, Read, Update, Delete) operations to facilitate easy management of these resources.

## Features:
- Manage Fashion Items
- Manage Discounts
- Manage Brands

## API Endpoints:
## Fashion Items:
POST /api/v1/fashion-items: Create a new fashion item.
GET /api/v1/fashion-items: Retrieve all fashion items.
GET /api/v1/fashion-items/{id}: Get a fashion item by ID.
PUT /api/v1/fashion-items/{id}: Update a fashion item.
DELETE /api/v1/fashion-items/{id}: Delete a fashion item by ID.

## Discounts:
POST /api/v1/discounts: Create a new discount.
GET /api/v1/discounts: Retrieve all discounts.
GET /api/v1/discounts/{id}: Get a discount by ID.
PUT /api/v1/discounts/{id}: Update a discount.
DELETE /api/v1/discounts/{id}: Delete a discount by ID.

## Brands:
POST /api/v1/brands: Create a new brand.
GET /api/v1/brands: Retrieve all brands.
GET /api/v1/brands/{id}: Get a brand by ID.
PUT /api/v1/brands/{id}: Update a brand.
DELETE /api/v1/brands/{id}: Delete a brand by ID.

## Setup Instructions:
Prerequisites:
Before begin, ensure we have the following installed:

Node.js (v14 or later)
npm (v6 or later)
A code editor (e.g., Visual Studio Code)


1. Clone the repository:
git clone https://github.com/your-username/fashion-item-api.git

cd fashion-item-api

2. Install Dependencies:
npm install

3. Run the Project Locally:
To run the server locally, use the following command:

npm start

4. Access the API Documentation:
The API documentation is available through Swagger at:

http://localhost:3000/docs


5. Testing:
Run the tests to ensure everything is functioning as expected:

npm run test
