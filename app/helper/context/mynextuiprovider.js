'use client'

import {NextUIProvider} from '@nextui-org/react'

export function MyNextUIProvider({children}) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}