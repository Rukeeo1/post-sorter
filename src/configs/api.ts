// should add to process.env
const apiUrl = 'https://jsonplaceholder.typicode.com'

const fetchData = async <T, D = any>(
  path: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
  data?: D
): Promise<T> => {
  const url = `${apiUrl}${path}`
  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }

  try {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    throw error
  }
}

export default fetchData
