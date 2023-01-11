import { useQuery } from "react-query"
import { apiMirage } from "../apiClient"
import { makeServer } from "../mirage"

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUserResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  if (process.env.NODE_ENV === "development") {
    makeServer()
  }
  const { data, headers } = await apiMirage.get("users", {
    params: {
      page,
    },
  })

  const totalCount = Number(headers["x-total-count"])

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }
  })

  return {
    users,
    totalCount,
  }
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}
// export function useUsers(page: number, options: UseQueryOptions) {
//   return useQuery(['users', page], () => getUsers(page), {
//     staleTime: 1000 * 60 * 10, // 10 minutos
//     ...options,
//   })
// }
