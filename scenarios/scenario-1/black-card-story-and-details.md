# Black Credit Card Application Process

When a user is a applying for a credit card, they are offered to apply for a black credit card. To be offered they must have over or equal to $1 million dollars in assets, a credit rating of 800 or better, and an acceptable back-end ratio. Assets are the sum of the amounts in checking, savings and investments.

After a person provides their assets and submits the app, if they meet the black card criteria, they see the black card offer page. They will be asked to accept or deny. they will have two buttons to choose from: Black Card or Regular Card. If they go Black Card, then they will see the black card application success. If not, they will see the regular card success page.

## Architecture Changes

Credit scores need to be moved out of the user-data.json file and need to be set at runtime using data in every persona. So, take the data from user-data.json and put it in the personas within data.json. The credit score should be passed in via a URL, so it can be used in the application calculations. If not provided, then default to 600.

## Black Card Offer Page Question

Congratulations, you are being offered to upgrade to our black card. Do you want to apply for a black card?

## Black Card Success Message

Thank you, your application was submitted for further processing.

## Richie Rich Data

```json
{
  "name": "Richie Rich",
  "aliases": [""],
  "firstName": "Richie",
  "middleInitial": "B",
  "lastName": "Rich",
  "dateOfBirth": "12/12/1970",
  "ssn": "555-55-5335",
  "countryOfCitizenShip": "GB",
  "countryOfCitizenShipSecondary": "US",
  "currentEmployerName": "Acme Shoes",
  "workPhone": "(555)444-3333",
  "yearsEmployed": 5,
  "monthsEmployed": 2,
  "occupation": "Business Owner",
  "monthlyHousingPayment": 1800,
  "checkingAmount": 200000,
  "savingsAmount": 200000,
  "investmentsAmount": 600000,
  "monthlyIncome": 5000,
  "username": "richie_rich",
  "password": "GherkinIsFun"
}
```

## Assets $1 under black card dollar minimum

```json
{
  "checkingAmount": 199999,
  "savingsAmount": 200000,
  "investmentsAmount": 600000
}
```

## Right under the black card credit score

```json
{
  "creditScore": 799
}
```
