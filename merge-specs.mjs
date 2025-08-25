#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { load, dump } from 'js-yaml';

// Read all OpenAPI spec files
const authSpec = load(readFileSync('./auth.yaml', 'utf8'));
const restaurantsSpec = load(readFileSync('./restaurants.yaml', 'utf8'));
const restaurantUsersSpec = load(readFileSync('./restaurant-users.yaml', 'utf8'));

// Create merged spec
const mergedSpec = {
  openapi: '3.0.3',
  info: {
    title: 'SerVu Backend API',
    description: 'Restaurant management backend API for employees, managers, and administrators',
    version: '1.0.0',
    contact: {
      name: 'SerVu Backend Team',
      email: 'support@servu.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server'
    },
    {
      url: 'https://api.servu.com/v1',
      description: 'Production server'
    }
  ],
  security: [
    { bearerAuth: [] }
  ],
  paths: {
    ...authSpec.paths,
    ...restaurantsSpec.paths,
    ...restaurantUsersSpec.paths
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token obtained from login endpoint'
      }
    },
    // Merge all schemas (with auth.yaml taking precedence for shared schemas)
    schemas: {
      ...restaurantUsersSpec.components.schemas,
      ...restaurantsSpec.components.schemas,
      ...authSpec.components.schemas // Auth schemas take precedence
    },
    // Merge all responses (with auth.yaml taking precedence)
    responses: {
      ...restaurantUsersSpec.components.responses,
      ...restaurantsSpec.components.responses,
      ...authSpec.components.responses
    }
  },
  tags: [
    ...authSpec.tags,
    ...restaurantsSpec.tags,
    ...restaurantUsersSpec.tags
  ]
};

// Write merged spec
writeFileSync('./openapi-merged.yaml', dump(mergedSpec, { lineWidth: -1 }));

console.log('✅ Merged OpenAPI specification created: openapi-merged.yaml');
console.log('');
console.log('Individual specs:');
console.log('- auth.yaml (Authentication endpoints)');
console.log('- restaurants.yaml (Restaurant management)'); 
console.log('- restaurant-users.yaml (User management)');
console.log('');
console.log('Use the merged file for code generation, documentation, or API tools.');