import { NextResponse } from 'next/server'
export function middleware(request) {
  const url = request.nextUrl.clone();
  const islogin = request.cookies.get('token');
  if ((!islogin)) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/component')) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
  }
  else if(islogin){
    if(url.pathname === '/'){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    else if (url.pathname === '/SignUp'){
      return NextResponse.rewrite(new URL('/dashboard', request.url))
    }
  }
}   