import api from '@/configs/api'
import { PostInterface} from '@/interfaces/Post'

export const getPosts = async (url: string): Promise<PostInterface[]> => {
  try {
    const response = await api<PostInterface[]>(url, 'GET')

    return response
  } catch (error) {
    throw error

  }
}
