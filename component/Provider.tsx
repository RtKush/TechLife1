import { ImageKitProvider } from '@imagekit/next'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function Provider({children}: {children:React.ReactNode}) {
  return (
    <SessionProvider>

      <ImageKitProvider urlEndpoint=''> 
        {children}
    </ImageKitProvider>

    </SessionProvider>
  )
        
}

export default Provider

/***********************************************************
 * Provider.tsx
 *
 * This component wraps global providers:
 * 1. SessionProvider (from next-auth) to share user auth session across the app.
 * 2. ImageKitProvider to configure ImageKit once (no need to repeat `urlEndpoint` in every image component).
 *
 * Usage:
 * - Wrap this around your app/layout in `_app.tsx` or `layout.tsx` to enable global context.
 ************************************************************/
