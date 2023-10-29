const users = [
    {
        "tag": "Willie Waters",
        "points": 10
    },
    {
        "tag": "Alicia Rodriguez",
        "points": 10
    },
    {
        "tag": "Erica Mendoza",
        "points": 10
    },
    {
        "tag": "Sharon Grant",
        "points": 10
    },
    {
        "tag": "Maria Gray",
        "points": 10
    },
    {
        "tag": "Edna Olson",
        "points": 10
    },
    {
        "tag": "Elizabeth Rhodes",
        "points": 10
    },
    {
        "tag": "Virginia Lopez",
        "points": 10
    },
    {
        "tag": "Sharon Nichols",
        "points": 10
    },
    {
        "tag": "Nancy Kelly",
        "points": 10
    },
    {
        "tag": "Mary Johnson",
        "points": 10
    },
    {
        "tag": "Carolyn Morales",
        "points": 10
    },
    {
        "tag": "Velma Wood",
        "points": 30
    }
]

const randCol = () => Math.round(Math.random() * 255)
function upgradeUsers(user ,index) {
    user.color = `RGB(${randCol()}, ${randCol()}, ${randCol()})`
    user.img =`/img/avataaars_${index + 1}.png`
}
users.forEach(upgradeUsers)

export default users