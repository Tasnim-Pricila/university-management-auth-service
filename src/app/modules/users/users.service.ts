import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

export const createUserServices = async (
  user: IUser
): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const result = await User.create(user)

  if (!result) {
    throw new Error('Failed to create user')
  }
  return result
}
