import fs from 'fs'
import path from 'path'
import { plainToInstance } from 'class-transformer'
import { IsString, validateSync, ValidationError } from 'class-validator'
import { config } from 'dotenv'

config({ path: '.env' })

if (!fs.existsSync(path.resolve('.env'))) {
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string
  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
  @IsString()
  SECRET_KEY: string
}

const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true,
})

const errors = validateSync(configServer)

if (Array.isArray(errors) && errors.length > 0) {
  const result = errors.map((error: ValidationError) => ({
    constraints: error?.constraints,
    property: error?.property,
    value: error?.value,
  }))

  throw new Error(JSON.stringify(result))
}

const envConfig = configServer

export default envConfig
