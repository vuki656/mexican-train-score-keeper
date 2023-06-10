import NextHead from 'next/head'

import { Game } from '@/modules'

const GamePage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Home
                </title>
            </NextHead>
            <Game />
        </>
    )
}

export default GamePage
