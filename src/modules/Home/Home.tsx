import {
    Paper,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import {
    useEffect,
    useState,
} from 'react'

import { GAMES_KEY } from './Home.constants'
import type { GameType } from './HomeNewGameDialog'
import { HomeNewGameDialog } from './HomeNewGameDialog'
import { gamesValidation } from './HomeNewGameDialog/HomeNewGameDialog.validation'

export const Home = () => {
    const router = useRouter()

    const [games, setGames] = useState<GameType[]>([])

    useEffect(() => {
        const games = gamesValidation.parse(
            JSON.parse(
                localStorage.getItem(GAMES_KEY) ?? '[]'
            )
        )

        setGames(games)
    })

    return (
        <Stack p={10}>
            <HomeNewGameDialog />
            <Title>
                Games
            </Title>
            {games.map((game) => {
                return (
                    <Paper
                        id={game.id}
                        withBorder={true}
                        p={10}
                        onClick={() => {
                            void router.push(`/game/${game.id}`)
                        }}
                    >
                        <Text>
                            {dayjs(game.createdAt).format('DD/MM/YYYY HH:mm')}
                        </Text>
                    </Paper>
                )
            })}
        </Stack>
    )
}
