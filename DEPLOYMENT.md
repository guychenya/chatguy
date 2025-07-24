# Deployment Guide for ChatGuy

This document provides instructions for deploying the ChatGuy application to various environments.

## Netlify Deployment

The ChatGuy application is configured for easy deployment on Netlify. The configuration is defined in the `netlify.toml` file in the root directory.

### Deployment Steps

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build command: (Will be defined when the application code is added)
   - Publish directory: (Will be defined when the application code is added)
3. Deploy the site

### Environment Variables

The following environment variables should be set in the Netlify dashboard:

- `REACT_APP_API_URL`: URL of the API service
- `REACT_APP_DEFAULT_PROVIDER`: Default AI provider to use

## Local Development

For local development, follow these steps:

1. Clone the repository
2. Install dependencies
3. Start the development server

## Troubleshooting

If you encounter issues with deployment:

1. Check the Netlify build logs for errors
2. Verify that all dependencies are correctly specified
3. Ensure that the build command is correctly configured