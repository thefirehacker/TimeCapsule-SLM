version: 1
frontend:
  phases:
    preBuild:
      commands:
      - git lfs install
      - git lfs pull 
      - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - echo "AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID" >> .env.production
        - echo "AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET" >> .env.production
        - echo "AUTH_GITHUB_ID=$AUTH_GITHUB_ID" >> .env.production
        - echo "AUTH_GITHUB_SECRET=$AUTH_GITHUB_SECRET" >> .env.production
        - echo "AUTH_SECRET=$AUTH_SECRET" >> .env.production
        - echo "NEXTAUTH_URL=$NEXTAUTH_URL" >> .env.production
        - echo "AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID_AWS" >> .env.production
        - echo "AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY_AWS" >> .env.production
        - echo "AWS_REGION=$REGION_AWS" >> .env.production
        - echo "NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL" >> .env.production
        - echo "RESEND_API_KEY=$RESEND_API_KEY" >> .env.production
        - echo "NEXT_BUILD_ENV=$NEXT_BUILD_ENV" >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - .npm/**/*