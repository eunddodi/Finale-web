'use client'
import useLocalStorage, { LOCAL_STORAGE_KEYS } from '@/hooks/useLocalStorage'
import { apiRequest } from '@/util'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

type AuthResponse = {
  userInfo: {
    name: string
    phoneNumber: string
  },
  token: string
}

async function sendAuthInformation(code: string, state: 'student' | 'coach'): Promise<AuthResponse> {
  const res = await apiRequest(`login/callback?code=${code}&state=${state}`)
  return res.data;
}

export default function LoginCallbackPage() {
  const params = useSearchParams()

  const setToken = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN)[1]
  const setUserName = useLocalStorage(LOCAL_STORAGE_KEYS.USER_NAME)[1]
  const setPhoneNumber = useLocalStorage(LOCAL_STORAGE_KEYS.USER_PHONE_NUMBER)[1]
  const redirectTo = useLocalStorage(LOCAL_STORAGE_KEYS.REDIRECT_TO)[0]

  const isCallbackExecuted = useRef(false)

  useEffect(() => {
    const authorizeAndRedirect = async () => {

      if (isCallbackExecuted.current) return

      try {
        const code = params.get('code')
        const state = params.get('state')

        if (!code || !state || (state !== 'student' && state !== 'coach')) throw new Error('Invalid code or state')

        isCallbackExecuted.current = true
        const { token, userInfo } = await sendAuthInformation(code, state)

        if (!token || !userInfo) throw new Error('Invalid token or userInfo')

        setToken(token)
        setUserName(userInfo.name)
        setPhoneNumber(userInfo.phoneNumber)
        window.location.href = redirectTo || '/'

      } catch (e) {
        alert('로그인에 실패했습니다. 홈 화면으로 이동합니다.')
        window.location.href = '/'
      }
    }

    authorizeAndRedirect()

  }, [params])
}
