const continents = [
    {
        "_id": 1,
        "name": "Korea"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Africa"
    },
    {
        "_id": 7,
        "name": "Australia"
    }

]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "0원 ~ 200,000원",
        "array": [0, 200000]
    },
    {
        "_id": 2,
        "name": "200,000원 ~ 500,000원",
        "array": [200001, 500000]
    },
    {
        "_id": 3,
        "name": "500,000원 ~ 1,000,000원",
        "array": [500001, 1000000]
    },
    {
        "_id": 4,
        "name": "1,000,000원 ~ 2,000,000원",
        "array": [1000001, 2000000]
    },
    {
        "_id": 5,
        "name": "2,000,000원 이상",
        "array": [2000000, 1000000000]
    }
]




export {
    continents,
    price
}