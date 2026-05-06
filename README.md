# AWS Serverless Appointment Workflow App

A full-stack serverless application built using AWS services, demonstrating CRUD operations, event-driven architecture, and workflow orchestration.

## Features
- Create records (save a name)
- Read saved records
- Update existing records
- Delete records
- Send email notifications on new records
- Orchestrate backend logic using Step Functions

## Architecture

Frontend (HTML, CSS, JavaScript hosted on S3)  
→ API Gateway  
→ Lambda (trigger)  
→ AWS Step Functions  
→ Save Lambda (DynamoDB)  
→ Notification Lambda (SNS → Email)

## Workflow

1. User submits a name from the frontend
2. API Gateway triggers a Lambda function
3. Lambda starts a Step Functions execution
4. Step Functions orchestrates:
   - Saving the record to DynamoDB
   - Sending a notification using SNS
5. User receives confirmation and email notification

## AWS Services Used
- Amazon S3 for static website hosting
- Amazon API Gateway for API routing
- AWS Lambda for backend logic
- AWS Step Functions for workflow orchestration
- Amazon DynamoDB for data storage
- Amazon SNS for notifications

## Key Concepts Demonstrated
- Serverless architecture
- Event-driven design
- Workflow orchestration using Step Functions
- Separation of concerns using multiple Lambda functions
- Integration between multiple AWS services

## What I Learned
- How to design and build serverless applications using AWS
- How to connect frontend applications to backend APIs
- How to orchestrate workflows using Step Functions
- How to structure applications using microservice principles
- How to debug real-world issues such as CORS, routing, and deployment

## Future Improvements
- Add user authentication with Amazon Cognito
- Improve UI/UX design
- Add filtering and search features
- Implement CI/CD pipeline for automated deployment
- Used CloudWatch logs to debug Lambda errors and troubleshoot Step Functions workflows
- Added Step Functions validation, retry logic, and failure alerting with SNS

## CI/CD

This project uses AWS CodePipeline to automatically deploy frontend changes from GitHub to an Amazon S3 static website bucket.

Flow:

GitHub commit → CodePipeline source stage → S3 deploy stage

When changes are pushed to the main branch, the pipeline automatically deploys the updated frontend files to S3.