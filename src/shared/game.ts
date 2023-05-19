import { showNotification } from '@mantine/notifications'

import { GAMES_KEY } from './constants'

import { gamesValidation } from '@/modules'
import type { GameType } from '@/modules/Home/HomeNewGameDialog'

export const getGames = () => {
    return gamesValidation.parse(
        JSON.parse(
            localStorage.getItem(GAMES_KEY) ?? '[]'
        )
    )
}

export const getGame = (gameId: string) => {
    const games = getGames()

    const game = games.find(({ id }) => {
        return id === gameId
    })

    if (!game) {
        showNotification({
            color: 'red',
            message: 'No game found',
            title: 'Error',
        })
    }

    return game
}

export const addGame = (game: GameType) => {
    const games = gamesValidation.parse(
        JSON.parse(
            localStorage.getItem(GAMES_KEY) ?? '[]'
        )
    )

    games.push(game)

    localStorage.setItem(
        GAMES_KEY,
        JSON.stringify(games)
    )
}
