import NextHead from 'next/head'
import { Home } from '@/modules'

const HomePage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Home
                </title>
            </NextHead>
        <Home />
        </>
    )
}

export default HomePage
