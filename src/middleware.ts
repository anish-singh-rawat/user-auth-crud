import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request : NextRequest) {
  const url = request.nextUrl.clone();
  const token = cookies()
  const islogin = token.get('authToken')

  if ((!islogin)) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/component')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  else if(islogin){
    if(url.pathname === '/'){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    else if (url.pathname === '/SignUp'){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
}   