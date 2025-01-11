export async function getTokens() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-tokens/`)
    const data = await response.json()

    return data
  } catch (error) {
    console.log('error getting tokens', error)
  }
}
