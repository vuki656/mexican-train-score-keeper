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

import type { GameType } from './Home.types'
import { HomeNewGameDialog } from './HomeNewGameDialog'

import { DATE_FORMAT } from '@/shared/constants'
import { getGames } from '@/shared/game'

export const Home = () => {
    const router = useRouter()

    const [games, setGames] = useState<GameType[]>([])

    useEffect(() => {
        setGames(getGames())
    }, [])

    const onGameClick = (gameId: string) => {
        return () => {
            void router.push({
                pathname: '/game/[gameId]',
                query: {
                    gameId,
                    roundNumber: 1,
                },
            })
        }
    }

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
                        onClick={onGameClick(game.id)}
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
