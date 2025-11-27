export interface EventEntity {
    id: string
    date: Date,
    time: string,
    description: string,
    participants: string[],
    organizerId: string
    registerUser: (userId: string) => void
}