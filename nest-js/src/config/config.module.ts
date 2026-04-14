// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

/**
 * Configuration Module
 * Handles loading and validating environment variables
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      // Make ConfigService available globally without importing in every module
      isGlobal: true,

      // Path to your .env file
      envFilePath: `.env`,

      // Function to validate configuration on startup
      // If validation fails, the application won't start
      validate,

      // Allows you to use ${OTHER_VAR} in .env file values
      expandVariables: true,

      // Cache the configuration for better performance
      cache: true,
    }),
  ],
})
export class ConfigurationModule {}