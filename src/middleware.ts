import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    
    if(token?.value.length) {
      const decodedToken = await fetch('http://127.0.0.1:8000/api/erp/decode-token', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ token: token.value })
      }).then(response => response.json())


      console.log(decodedToken)

      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard',
}