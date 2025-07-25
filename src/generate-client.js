import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { generate, HttpClient } from 'openapi-typescript-codegen';

const OPENAPI_URL = 'http://localhost:3005/api-json';
const OUTPUT_DIR = path.resolve(__dirname, './api-client');

async function generateClient() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    const response = await fetch(OPENAPI_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI JSON: ${response.statusText}`);
    }

    const openApiSpec = await response.json();

    await generate({
      input: openApiSpec,
      output: OUTPUT_DIR,
      httpClient: HttpClient.FETCH,
    });

    console.log('TypeScript client generated successfully.');
  } catch (error) {
    console.error('Error generating TypeScript client:', error);
  }
}

generateClient();
