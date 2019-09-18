# Express with Apollo Server and Error Handling

## Basic public query

JSON body, with `Content-Type: application/json` header:

```json
{
  "query": "{ helloPublic }"
}
```

In Postman GraphQL mode or in GraphiQL:

Query:

```graphql
{ helloPublic }
```

Response:

```json
{
  "data": {
    "helloPublic": "Hello public"
  }
}
```

## Query with variables

JSON body, with `Content-Type: application/json` header:

```json
{
  "query": "query($num: Int!) { helloVariable(someNumber: $num) }",
  "variables": {
    "num": 3
  }
}
```

In Postman GraphQL mode or in GraphiQL:

Query:

```graphql
query($num: Int!) { helloVariable(num: $someNumber) }
```

Variables:

```json
{
  "num": 3
}
```

Reponse:

```json
{
  "data": {
    "helloVariable": "Your number was 3"
  }
}
```

## Private query

In Postman GraphQL mode or in GraphiQL:

```graphql
{ helloPrivate }
```

```json
  "errors": [
    {
      "message": "Not authenticated",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "helloPrivate"
      ],
      "extensions": {
        "code": "UNAUTHENTICATED",
        "exception": {
          "stacktrace": [
            "AuthenticationError: Not authenticated",
```

In Postman GraphQL mode or in GraphiQL with the dummy `user: whatever` header, which is used to simulate an authenticated user:

```json
{
  "data": {
    "helloPrivate": "Hello private"
  }
}
```

## Bad Input Handling

In Postman GraphQL mode or in GraphiQL:

```graphql
query ($num: Int!) { helloBadInput(lessThanFive: $num) }
```

With variables:

```json
{
  "num": 3
}
```

Response:

```json
{
  "data": {
    "helloBadInput": true
  }
}
```

With variables:

```json
{
  "num": 10
}
```

Response:

```json
{
  "errors": [
    {
      "message": "Argument lessThanFive must be less than 5 (received 10)",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "helloBadInput"
      ],
      "extensions": {
        "code": "BAD_USER_INPUT",
        "exception": {
          "stacktrace": [
            "UserInputError: Argument lessThanFive must be less than 5 (received 10)",
```
