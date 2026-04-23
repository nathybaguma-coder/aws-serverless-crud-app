# AWS Serverless CRUD App

A simple full-stack serverless application built using AWS services.

## Features
- Create (Save a name)
- Read (Display saved names)
- Update (Edit a name)
- Delete (Remove a name)

## Architecture
- Frontend: Amazon S3 (Static Website)
- Backend: AWS Lambda (Node.js)
- API: Amazon API Gateway
- Database: Amazon DynamoDB

## How it works
1. User interacts with the UI
2. Frontend sends request to API Gateway
3. API Gateway triggers Lambda
4. Lambda performs CRUD operations in DynamoDB
5. Response is returned and displayed in the UI

## Technologies Used
- HTML, CSS, JavaScript
- AWS Lambda
- API Gateway
- DynamoDB
- S3 Static Hosting

## What I Learned
- Building a serverless architecture
- Connecting frontend to backend APIs
- Working with DynamoDB (CRUD operations)
- Debugging real-world issues (CORS, routing, regions)