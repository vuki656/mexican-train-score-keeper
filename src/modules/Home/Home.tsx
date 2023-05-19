import { Box } from '@mantine/core'

import { GAMES_KEY } from './Home.constants'
import { gamesValidation } from './Home.validation'
import { HomeNewGameDialog } from './HomeNewGameDialog'

export const Home = () => {
    const onNewGame = () => {
        const gamesRaw = localStorage.getItem(GAMES_KEY) ?? '[]'

        const games = gamesValidation.parse(JSON.parse(gamesRaw))

        games.push({
            createdAt: new Date(),
            players: [],
        })
    }

    return (
        <Box>
            <HomeNewGameDialog />
        </Box>
    )
}
