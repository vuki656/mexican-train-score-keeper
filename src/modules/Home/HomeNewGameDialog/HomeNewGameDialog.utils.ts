import { ROUND_AMOUNT } from '@/shared/constants'

export const generatePlayerRounds = () => {
    return [...new Array(ROUND_AMOUNT)].map((_, index) => {
        return {
            points: 0,
            number: index + 1,
        }
    })
}
