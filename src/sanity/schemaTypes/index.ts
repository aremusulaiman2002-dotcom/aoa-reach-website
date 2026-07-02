import type { SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { author } from './author'
import { category } from './category'
import { post } from './post'

export const schemaTypes: SchemaTypeDefinition[] = [blockContent, author, category, post]
