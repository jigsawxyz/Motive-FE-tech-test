## Motive create tech test

To start; create a fork of this readme.

The aim of this test is to assess your ability to fetch data from an api and transform it into a required format. Tests are included in `group-transactions.test`. These should all pass for the test to be deemed as complete.

## Getting started

run `npm i`

## Data

This is the same for all questions and can be found at `https://gist.githubusercontent.com/simeor/5dd52dccdf5c4b4183ab2f2e80728bec/raw/5d042617ce514687fedffba35ec04539cb173481/data.json`

## 1). grouped by merchant

Using the given data write a function that returns an _object_ who's keys are the name of the merchant and the value object has a count of the total transactions and an array of all the transactions

```
{
  'Marks & Spencer': {
    count: 8,
    transactions: [
      ...transaction data un-transformed
    ]
  }

}

```

## 2). grouped by date

Using the given data write a function that returns an _array_ of objects that represent the transactions occuring on a specific day.

```
[
  {date: '09/10/2020', count: 4, transactions: [
    ...transaction data un-transformed
  ]}
]


```

**if using typescript the expectation is that you create types for the raw data and the interface / return types of your function**
