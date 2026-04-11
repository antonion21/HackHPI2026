export const userData = $state({
    name: "Jona Ollek",
    avatar: "https://thispersondoesnotexist.com/",
    points: 130,
    value: "30",
})

export const cardData = $state({
    cards: [
        {
            amount: 2,
            name: "Nextbike Ride",
            date: "19.09.2025"
        },
        {
            amount: -10,
            name: "Local Bakery",
            date: "10.09.2025"
        },
        {
            amount: undefined,
            name: "Solar Panel",
            date: "29.08.2025"
        }
    ]
})