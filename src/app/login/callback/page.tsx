import { apiRequest } from '@/util'
import { redirect } from 'next/navigation'

async function sendAuthInformation(code: string, state: 'student' | 'coach') {
  await apiRequest(`login/callback?code=${code}&state=${state}`)
}

export default async function LoginCallbackPage({ searchParams }: {
  searchParams: { code: string, state: 'student' | 'coach' }
}) {
  await sendAuthInformation(searchParams.code, searchParams.state)
  redirect('/lesson')
}
