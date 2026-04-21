import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical/html'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeLexical(data: unknown) {
  if (!data) return ''

  try {
    return convertLexicalToHTML({ data: data as never, converters: defaultHTMLConverters })
  } catch {
    return ''
  }
}
