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

import type { GameType } from '../Home/Home.types'

import { DATE_FORMAT } from '@/shared/constants'
import { getGame } from '@/shared/game'

export const Game = () => {
    const router = useRouter()

    const [game, setGame] = useState<GameType>()

    useEffect(() => {
        const foundGame = getGame(router.query.gameId as string)

        setGame(foundGame)
    }, [])

    return (
        <Stack p={10}>
            <Title
                suppressHydrationWarning={true}
                align="center"
            >
                {dayjs(game?.createdAt).format(DATE_FORMAT)}
            </Title>
            {game?.players.map((player) => {
                return (
                    <Paper
                        key={player.id}
                        withBorder={true}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            height: 200,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            size={30}
                            weight="bold"
                        >
                            {player.name}
                        </Text>
                    </Paper>
                )
            })}
        </Stack>
    )
}
