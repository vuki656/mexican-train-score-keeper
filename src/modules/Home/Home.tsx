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

import type { GameType } from './HomeNewGameDialog'
import { HomeNewGameDialog } from './HomeNewGameDialog'

import { DATE_FORMAT } from '@/shared/constants'
import { getGames } from '@/shared/game'

export const Home = () => {
    const router = useRouter()

    const [games, setGames] = useState<GameType[]>([])

    useEffect(() => {
        setGames(getGames())
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
                        key={game.id}
                        id={game.id}
                        withBorder={true}
                        p={10}
                        onClick={() => {
                            void router.push(`/game/${game.id}`)
                        }}
                    >
                        <Text>
                            {dayjs(game.createdAt).format(DATE_FORMAT)}
                        </Text>
                    </Paper>
                )
            })}
        </Stack>
    )
}
