import { showNotification } from '@mantine/notifications'

import { GAMES_KEY } from './constants'

import type { GameType } from '@/modules'
import { gamesValidation } from '@/modules'

export const updatePlayerRoundPoints = ({ gameId, playerId, points, roundNumber }: { gameId: string, playerId: string, points: number, roundNumber: number }) => {
    const games = getGames()

    const game = games.find((game) => {
        return game.id === gameId
    })

    game?.players.forEach((player) => {
        if (player.id === playerId) {
            player.rounds.forEach((round) => {
                if (round.number === roundNumber) {
                    round.points = points
                }
            })
        }
    })
}

export const getPlayerRoundScore = (roundNumber: number, playerId: string | null, gameId: string) => {
    const game = getGame(gameId)

    const player = game?.players.find((player) => {
        return player.id === playerId
    })

    if (!player) {
        showNotification({
            color: 'red',
            message: 'Player not found',
            title: 'Error',
        })
    }

    const round = player?.rounds.find((round) => {
        return round.number === roundNumber
    })

    if (!round) {
        showNotification({
            color: 'red',
            message: 'Round not found',
            title: 'Error',
        })
    }

    return round?.points ?? 0
}

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

        throw new Error("No game found")
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
