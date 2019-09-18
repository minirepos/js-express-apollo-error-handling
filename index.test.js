const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:8000'

test('basic', async () => {
  expect((await axios.post('/graphql', { query: '{ helloPublic }' })).data).toEqual({
    data: {
      helloPublic: 'Hello public',
    },
  })
})

test('variable', async () => {
  expect(
    (await axios.post('/graphql', {
      query: 'query($num: Int!) { helloVariable(someNumber: $num) }',
      variables: { num: 3 },
    })).data
  ).toEqual({
    data: {
      helloVariable: 'Your number was 3',
    },
  })
})

test('private', async () => {
  expect(
    (await axios.post('/graphql', { query: '{ helloPrivate }' }, { headers: { user: 'whatever' } }))
      .data
  ).toEqual({
    data: {
      helloPrivate: 'Hello private',
    },
  })
  expect(
    (await axios.post('/graphql', { query: '{ helloPrivate }' })).data.errors[0].extensions.code
  ).toBe('UNAUTHENTICATED')
})

test('bad input', async () => {
  expect(
    (await axios.post('/graphql', {
      query: 'query ($num: Int!) { helloBadInput(lessThanFive: $num) }',
      variables: { num: 3 },
    })).data
  ).toEqual({
    data: {
      helloBadInput: true,
    },
  })
  expect(
    (await axios.post('/graphql', {
      query: 'query ($num: Int!) { helloBadInput(lessThanFive: $num) }',
      variables: { num: 10 },
    })).data.errors[0].extensions.code
  ).toBe('BAD_USER_INPUT')
})
