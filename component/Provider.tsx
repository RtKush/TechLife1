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


