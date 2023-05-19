import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconTrash } from '@tabler/icons-react'
import { nanoid } from 'nanoid'
import { useMemo } from 'react'
import {
    useFieldArray,
    useForm,
} from 'react-hook-form'

import type { NewGameFormValue } from './HomeNewGameDialog.types'
import { newGameValidation } from './HomeNewGameDialog.validation'

import { ICON_SIZE } from '@/shared/constants'
import { extractFormFieldErrors } from '@/shared/utils'

const DEFAULT_PLAYER_COUNT = 4

export const HomeNewGameDialog = () => {
    const [isOpen, { close, open }] = useDisclosure()

    const startingPlayers = useMemo(() => {
        return [...new Array(DEFAULT_PLAYER_COUNT)].map(() => {
            return {
                id: nanoid(),
                name: '',
            }
        })
    }, [])

    const {
        control,
        formState,
        handleSubmit,
        register,
    } = useForm<NewGameFormValue>({
        resolver: zodResolver(newGameValidation),
        values: {
            players: startingPlayers,
        },
    })

    const { append, fields, remove } = useFieldArray({
        control,
        name: 'players',
    })

    const onPlayerAdd = () => {
        if (fields.length === 10) {
            return
        }

        append({
            id: nanoid(),
            name: '',
        })
    }

    const onPlayerRemove = (index: number) => {
        return () => {
            remove(index)
        }
    }

    const onSubmit = (formValue: NewGameFormValue) => {
        console.log(formValue)
    }

    return (
        <>
            <Button onClick={open}>
                New Game
            </Button>
            <Modal
                centered={true}
                onClose={close}
                opened={isOpen}
                radius="md"
                size="lg"
                title="Create a New Game"
                withCloseButton={true}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        {fields.map((field, index) => {
                            return (
                                <TextInput
                                    key={field.id}
                                    placeholder={`Player ${index + 1} Name`}
                                    label={`Player ${index + 1}`}
                                    rightSection={(
                                        <IconTrash
                                            size={ICON_SIZE}
                                            color="gray"
                                            onClick={onPlayerRemove(index)}
                                        />
                                    )}
                                    {...register(`players.${index}.name`)}
                                    {...extractFormFieldErrors(formState.errors.players?.[index]?.name)}
                                />
                            )
                        })}
                        <Button
                            variant="outline"
                            onClick={onPlayerAdd}
                        >
                            Add Player
                        </Button>
                        <Button type="submit">
                            Create Game
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}