import { useRouter } from "next/navigation"
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "./useLocalStorage"
import { useEffect, useState } from "react"

export const useAuthRedirect = () => {
  const router = useRouter()
  const [token] = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN)
  const [, setRedirectTo] = useLocalStorage(LOCAL_STORAGE_KEYS.REDIRECT_TO)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        const currentPath = window.location.pathname
        setRedirectTo(JSON.stringify(currentPath))
        router.push('/login')
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [token, setRedirectTo, router])

  return isAuthenticated
}
