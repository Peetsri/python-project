const setupUrl = (): 'production' | 'development' => {
  return process.env.NODE_ENV as any
}

export const BaseUrl = {
  development: process.env.NEXT_PUBLIC_BASE_URL,
  production: process.env.NEXT_PUBLIC_BASE_URL
}[setupUrl()]

export const ApiUrl = {
  development: process.env.NEXT_PUBLIC_API_URL,
  production: process.env.NEXT_PUBLIC_API_URL
}[setupUrl()]

export const StaticFileUrl = {
  development: process.env.NEXT_PUBLIC_STATIC_FILE_URL,
  production: process.env.NEXT_PUBLIC_STATIC_FILE_URL
}[setupUrl()]
