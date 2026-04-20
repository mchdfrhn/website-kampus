'use server'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import config from '../../../../payload.config'
import { importMap } from './importMap'

export const serverFunctions: ServerFunctionClient = async (args) =>
  handleServerFunctions({ ...args, config, importMap })
