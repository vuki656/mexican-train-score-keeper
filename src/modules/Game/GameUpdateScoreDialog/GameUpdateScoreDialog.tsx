import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GameUpdateScoreDialogProps, GameUpdateScoreForm } from './GameUpdateScoreDialog.types'
import { useEffect } from 'react'
import { getPlayerRoundScore, updatePlayerRoundPoints } from '@/shared/game'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateGameScoreValidation } from './GameUpdateScoreDialog.validation'
import { extractFormFieldErrors } from '@/shared/utils'

export const GameUpdateScoreDialog = (props: GameUpdateScoreDialogProps) => {
    const { 
        player,
        onClose: onCloseProp
    } = props

    const router = useRouter()

    const [isOpen, { close, open }] = useDisclosure()

    useEffect(() => {
        if (!player) {
            return
        }

        open()
    }, [player])

    const { 
        register,
        formState,
        handleSubmit
    } = useForm<GameUpdateScoreForm>({
        resolver: zodResolver(updateGameScoreValidation),
        defaultValues: {
            score: getPlayerRoundScore(
                Number(router.query.roundNumber),
                player?.id ?? null,
                String(router.query.gameId)
            )
        }
    })


    const onClose = () => {
        onCloseProp()

        close()
    }

    const onSubmit = (formValue: GameUpdateScoreForm) => {
        if (!player) {
            throw new Error("No player to update")
        }

        updatePlayerRoundPoints({
            gameId: String(router.query.gameId),
            playerId: player.id,
            points: formValue.score,
            roundNumber: Number(router.query.roundNumber)
        })

        close()
    }

    return (
        <Modal
            centered={true}
            onClose={onClose}
            opened={isOpen}
            radius="md"
            size="lg"
            title={`Update Score for ${player?.name}`}
            withCloseButton={true}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <TextInput 
                        label="Score"
                        placeholder='Enter score'
                        type='number'
                        {...register('score', {
                            valueAsNumber: true
                        })}
                        {...extractFormFieldErrors(formState.errors.score)}
                    />
                    <Group>
                        <Button variant='outline' fullWidth={true} onClick={onClose}>Cancel</Button>
                        <Button fullWidth={true} type="submit">Save</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}
