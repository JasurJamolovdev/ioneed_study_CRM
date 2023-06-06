
# Animals mini crud

This little routine is an example of a crud system made in typescript. and if you're wondering how endpoints are written in express and typescript. copy my code and try it yourself!


## API Reference

#### Get all animals

```http
  GET /api/
```

#### Get One animal

```http
  GET /api/:animal_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `animal_id`      | `string` | **Required**. Id of animal to fetch |

#### POST Animal

```http
  POST /api/addAnimal
```

| body  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of animal  |
| `color`      | `string` | **Required**. color of animal |
| `price`      | `string` | **Required**. price of animal |

#### UPDATE Animal

```http
  POST /api/updateAnimal/:animal_id
```
| Parameter  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `animal_id`      | `string` | **Required**.  Id of animal to UPDATE  |


| Body  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of animal  |
| `color`      | `string` | **Required**. color of animal |
| `price`      | `string` | **Required**. price of animal |

#### DELETE Animal

```http
  DELETE /api/deleteAnimal/:animal_id
```
| Parameter  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `animal_id`      | `string` | **Required**.  Id of animal to DELETE  |

                    Thanks for watching!
## Author

- [@JasurJamolov](https://www.github.com/JasurJamolovdev)

