import type { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') {
      return true
    }

    const userId = (user as typeof user & { id?: string | number }).id

    return {
      id: {
        equals: userId,
      },
    }
  }

  return false
}
