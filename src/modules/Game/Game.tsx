import {
    Pagination,
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

import {
    DATE_FORMAT,
    ROUND_AMOUNT,
} from '@/shared/constants'
import { getGame } from '@/shared/game'

export const Game = () => {
    const router = useRouter()

    const [game, setGame] = useState<GameType>()

    useEffect(() => {
        const foundGame = getGame(router.query.gameId as string)

        setGame(foundGame)
    }, [])

    const onRoundChange = (roundNumber: number) => {
        void router.push(
            {
                pathname: '/game/[gameId]',
                query: {
                    gameId: game?.id,
                    roundNumber,
                },
            },
            undefined,
            {
                shallow: true,
            }
        )
    }

    return (
        <Stack p={10}>
            <Title
                suppressHydrationWarning={true}
                align="center"
            >
                {dayjs(game?.createdAt).format(DATE_FORMAT)}
            </Title>
            <Pagination
                total={ROUND_AMOUNT}
                value={Number(router.query.roundNumber ?? 0)}
                onChange={onRoundChange}
            />
            {game?.players.map((player) => {
                const { points } = player.rounds.find((round) => {
                    return round.number === Number(router.query.roundNumber)
                }) ?? {}

                const totalScore = player.rounds.reduce((accumulator, { points }) => {
                    return accumulator + points
                }, 0)

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
                        <Stack>
                            <Text
                                size={30}
                                weight="bold"
                                align='center'
                            >
                                {player.name}
                            </Text>
                            <Text
                                size={30}
                                weight="bold"
                                align='center'
                            >
                                Round Score: {points}
                            </Text>
                            <Text
                                size={30}
                                weight="bold"
                                align='center'
                            >
                                Total Score: {totalScore}
                            </Text>
                        </Stack>
                    </Paper>
                )
            })}
        </Stack>
    )
}
