# Concise Declarative Gherkin is the Answer

*Originally published by Joe Bailey on Medium (Contino Engineering) - July 26, 2021*
[Concise Declarative Gherkin is the Answer!](https://medium.com/contino-engineering/declarative-gherkin-is-the-answer-c550adbc8ed0)

Sick of newly created software having the wrong behaviors? Hate the hard-to-understand acceptance criteria? Want to speed up backlog refinement and story estimation? Desire better collaboration with vital stakeholders and SMEs? If you answer yes to any of these questions or just want to improve your Cucumber Gherkin writing, then this article is for you. In addition, Concise Declarative Gherkin (CDG) is an important element of Contino's software delivery under its pillars of excellence. CDG fits in the pillars of [Enterprise DevOps Transformation](https://www.contino.io/services/enterprise-devops-transformation) and [Cloud Native Software Development](https://www.contino.io/services/cloud-native-software-development).

---

## Introduction

Communicating detailed requirements between SMEs/users, product managers, and product teams is hard. There are several tools and techniques to convey the many facets of a system, but they break down when explaining important system behaviors. These are behaviors so vital, product success depends upon them. To implement these behaviors correctly, developers need clear requirements, which they can easily verify with automated tests.

Behavior-Driven Development (BDD), created in 2004 by Dan North, helps address the communication issues while providing clear requirements. Cucumber, created in 2008 by Aslak Hellesøy, helps developers write automated BDD tests. However, many Cucumber adopters write imperative Gherkin, which can greatly dilute the power of Cucumber. In many cases, it adds more confusion and hides the behavior under test. Thus, adopting Cucumber incorrectly, means product teams are not practicing good BDD. Therefore, they need a better solution.

Concise Declarative Gherkin is the answer! It helps improve communication and provides developer test guidance. The very concise and understandable nature of CDG improves communication and engagement. It also provides guidance to the developer on what to implement along with what to test. CDG embraces and enforces BDD principles. Unlike imperative Gherkin, which can become a QA test case checklist and obscure the behavior under test, CDG has the following benefits:

- Reduces confusion and rework
- Improves software quality and team velocity
- Increases engagement with SMEs/users, product managers, and product teams
- Provides fast feedback to developers, saving them time

Before getting into how CDG achieves these benefits, let's look at Gherkin gone wrong.

## Imperative Gherkin

With complex behaviors, Imperative Gherkin becomes noisy and full of irrelevant information. This slew of irrelevant information mixed with complex behaviors creates Gherkin with recurring Given-When-Then chains, which can become pages long. Coupling a vague scenario name with a complex Gherkin step chain results in a nearly worthless and hard-to-maintain test suite.

The imperative Gherkin example below describes a behavior within a web-based form for new credit applications. "Tom Smith" is applying for a new credit card and successfully submits their form. However, the imperative Gherkin contains too much irrelevant information, which hides the behavior under test. The scenario name hints at what is being tested, but you cannot be sure. The Gherkin steps have let the technology bleed through in granular detail. Take a look:

```gherkin
Scenario: Successful submittal with $100K income with $3332 monthly housing payment
Given I am logging in with username "tom.smith" and password "Password1234"
And I am on the apply for credit card page
And I click individual application
And I type in first name Tom
And I type in middle initial L
And I type in last name Smith
And I type date of birth 12/12/1968
And I type ssn 123–12–1223
When I click the next button
Then I see the page street address
Given I type in the street address 123 Main St.
And I type in the town Bakers
And I type in the state CA
And I type in the zip 73244
When I click the next button
Then I see the page mailing address
Given I click same as street address
When I click the next button
Then I see the page contact info
Given I type email address tom.l.smith@testapp.com
And I type in the home phone number (123)555–1234
And I type in the mobile phone number (123)555–2222
When I click the next button
Then I see the page employment and citizenship
Given I type in the country of permanent residence USA
And I type in country of citizenship USA
And I type in country of dual citizenship UK
And I type in current employer Acme Bolts
And I type in work phone (121)555–2233
And I type in employed yrs/mon 5/6
And I type in occupation goat herder
When I click the next button
Then I see the page title financials
Given I type in yearly income $100,000
And I type in monthly housing payment $3,332
And I click checking
And I type into checking $120,000
And I click savings
And I type into saving $55,000
And I click investment
And I type into investment $1,500,000
And I click the sign the form button
When I click the submit button
Then I see the system wait message "processing application…"
And I see system message "Thank you, your application was submitted for further processing"
```

> Gherkin is designed to facilitate communications between the development team and its stakeholders. Imperative Gherkin does the opposite by obscuring the relevant details of the behavior under test. In addition, it is so easy to create imperative Gherkin, so it becomes the default style in many organizations.

## The Flaws of Imperative Gherkin

Imperative Gherkin is easy to create but is hard to manage in the long run. Besides being very verbose and unclear in the best of cases and downright confusing in the worst, imperative Gherkin has several flaws. Imperative Gherkin flaws are:

- Lack of business terms
- Technology over business focus
- Hard to manage Gherkin steps and test data
- Can lead to non-behavior testing
- Test Confusion
- Low reuse of Gherkin steps
- Tight coupling with the user interface
- Test script in disguise

From the previous Imperative Gherkin example, one can see it is verbose and unclear the behavior it is testing. With the granular focus of imperative Gherkin steps, they make it hard to use business/industry terms. In addition, it focuses on the technology implementation and not the business behavior it is addressing. Due to the granular nature of imperative Gherkin, the test suite contains several more steps when compared to CDG. This also impacts test data, as it is embedded in these test steps, which makes it difficult to manage. With the lack of focus on behavior testing, non-behavior testing can creep into the test suite. CDG is the complete opposite of Imperative Gherkin.

## Concise Declarative Gherkin

CDG describes system behaviors from a user's perspective. It describes these user behaviors in a concise and human-readable form, from the scenario name to the scenario steps and the scenario as a whole. CDG is about removing unneeded information, while correctly describing the system behavior.

CDG is nothing new, Cucumber documentation even mentions it in their [Writing Better Gherkin](https://cucumber.io/docs/bdd/better-gherkin/) webpage. This document builds upon their recommendations and provides additional add-ons to get the most from CDG. These add-ons are based on experience with Cucumber over the years in highly regulated environments, like global financial organizations.

The CDG example below describes the same test from the imperative Gherkin previously, but in a clear and concise manner. Tom Smith's data is used to apply for a new credit card, which barely passes the back-end ratio check. The back-end ratio is a financial industry term comparing monthly debts against monthly income, found in the specific definition below. This business term is a vital system behavior in our example app. Thus, its validation is important, so a failing test is required. "Mike Fog" data is confirming the barely failing back-end ratio scenario. This is a good example of boundary testing of the back-end ratio check. All this is accomplished in this short and CDG.

```gherkin
Scenario: Successful form submittal of a minimum acceptable back-end ratio
Given "Tom Smith with minimum acceptable back-end ratio" logs in
And "Tom Smith" fills out the form with their information
When they submit their form
Then they see a "success" submittal response

Scenario: Fail form submittal due to a barely unacceptable back-end ratio
Given "Mike Fog with a just barely failing back-end ratio" logs in
And "Mike Fog" fills out the form with their information
When they submit their form
Then they see a "failing" submittal response
```

**Back-end ratio definition from Credit.org:**

> "The sum of your monthly mortgage payment and all other monthly debts (credit cards, car payments, student loans, etc.) divided by your monthly pre-tax income. Traditionally, lenders wouldn't give people loans that increased this ratio past 36%, but they often do now."

Each previous example of Gherkin explains the behavior under test in four simple Gherkin steps. These steps describe the essential sequence to create the behavior. In addition, none of the technology or other system complexities are described in the Gherkin. It describes how a specific user is able to get a successful credit form submission while having a barely acceptable back-end ratio. This concise way of describing system behaviors from a user's perspective is a great way to communicate. While on the other extreme is imperative Gherkin.

## Concise Declarative Gherkin Saves the Day

Properly written CDG can address the failings of Imperative Gherkin. It improves critical communication between product teams and stakeholders. In the long run, CDG is easier to manage, saving time and money. The end result is a higher quality acceptance test suite.

## Improved Critical Communications

When product teams use Agile and Lean methodologies, they are competing to stay ahead of the competition and keeping up with the market demand. They need to ensure they are delivering the highest value to their user. CDG helps express customer value in a way it can be implemented in software and automated tests.

Being written in a concise and understandable language facilitates communications between the product team, business, and other stakeholders. It helps product teams quickly flush out other behaviors, typically failure paths. With a complete behavior set, the product team's ticket refinement and point estimations are much much faster and accurate. Thereby, improving the team's velocity and quality.

## Easier Test Suite Management

Properly implemented CDG creates an easy-to-manage test suite. This is due to several factors:

- Fewer Gherkin steps
- Implementation details in the test code
- Centralized test data

Fewer Gherkin steps make it easier to manage in the long run, making it easier to reuse and organize steps. It is still recommended to organize them into a file and folder structure, as a single file is not appropriate.

With the technical implementation in the test code, changes to the user interface are less likely to require changes to the Gherkin. As long as the system behavior has not changed, the Gherkin should not change. With imperative Gherkin, each test scenario covering the change would require a change. In CDG with no behavior change, the change could be isolated to one piece of test code. This saves a lot of time over the life of a product.

Imperative Gherkin embeds the data in the test scenarios. This makes them easy to write initially, but as time progresses, they are painful to update. When there is a change in the system, the test data needs to change in each scenario impacted. Just adding a field to a form, impacts all tests exercising the form. This is wasteful.

With CDG, it is best to couple it with centralized data. It makes it easier to manage in the long term. Adding a new field to a form with no behavior change is easy. Some minor test changes can quickly support the new field. The coupling of centralized test data and keeping implementation details in test code makes for easy test maintenance, resulting in lower test suite maintenance costs and developer frustration.

## Higher Quality Test Suite

Proper CDG provides great guidance to the developer on what to build and test. This makes it a great communication and testing tool. It reduces confusion between developers and stakeholders. Clear and concise Gherkin, also allows for productive discussion during ticket refinement. Thus, developers can have great confidence they are building and testing what was requested. This greatly reduces confusion and focuses testing.

Imperative Gherkin can obscure the behavior under test, which can lead to non-behavior testing. A good example of non-behavior testing is UI testing. This type of testing should be done in its own test suite. Otherwise, it will force Gherkin to include UI elements checks at various points in the test scenario flow. This leads to multiple Given-When-Then chains seen in the imperative Gherkin example earlier. By moving non-behavior testing to another test suite(s), testing can maximize the benefits of CDG.

## CDG Add-ons

Imperative Gherkin is easy to write but is costly and painful in the long term. CDG is harder to write initially but is so much easier in the long term. These long-term successes require some upfront investments. CDG add-ons are these investments. They make implementing this type of CDG much easier and only require a few days of work or less.

Three crucial add-ons are needed: centralized data management improved cucumber logging and business/industry terms wiki. The first two are implemented by the test implementer, while the wiki is more of a team/organization activity.

## Centralized Data Management

This form of declarative Gherkin leverages names and aliases to look up data for the test scenario. Thus, test data can be centralized, which reduces data duplication and makes data management much easier. The data should remain with the tests in the source code repository in a simple set of files, in YAML or JSON format. The test implementer must create the software to support centralized data management. It should take a day or so to implement, as it involves some simple source code. More details are in the reference implementation, link below. This upfront work pays off in the immediate future and much more in the long term.

## Improved Cucumber Logging

CDG pushes more test actions into a single Gherkin step. Thus, test failures can be harder to troubleshoot. Improving Cucumber logging is important to speed up troubleshooting and reduce frustration. Using tools like BrowserStack, Saucelabs, and similar can make troubleshooting longer. Their tools are not optimized for a Cucumber test suite, so they do not provide the best context. Good Cucumber logging highlights the issues by scenario step and provides vital information for troubleshooting.

To improve troubleshooting, Cucumber HTML reporting with vital details is important. The vital details are:

- Exact failure location within the test suite
- Screenshot of the web/mobile device, if applicable
- Client logs, if applicable
- Test run metadata

Cucumber has the ability to log test failures, typically out of the box. If not, a Cucumber after hook can log these details.

An after hook can also add screenshots to the Cucumber logs on failure, which will show up under the failing Gherkin step. This provides context with the UI state of the client during the failure. Coupled with client logs embedded in the failing Gherkin, the scenario is a powerful troubleshooting tool.

Capturing test run metadata is vital, especially when a test suite can support several configuration options. All of this data within the context of the Gherkin scenario steps is a powerful troubleshooting tool, which can save several hours of frustration. It should take a day or so to implement these logging additions. More details are in the reference implementation, link below.

## Business/Industry Terms Wiki

This form of declarative Gherkin pushes the details to the test code and centralized data management. In addition, the Gherkin heavily leverages industry/business terms. These terms must be documented, so the product team and stakeholders have a common understanding of them. Over time, these terms will change in meaning and/or value, so versioning is required.

Imagine the minimum acceptable low credit score for a certain type of client requesting a new credit card is 630. In this very simple example, the definition of "minimum acceptable low credit score" or "low credit score" should exist in the wiki with the value. Since the definition and value can change over time, this can break traceability. Thus, when terms are used in Gherkin, a link to a specific version of the wiki should be referenced. This should be done where the product team tracks work, like Jira, Trello, Rally, and so on.

A business/industry terms wiki is a powerful tool for tracking essential business information. Coupling this with CDG and its other add-ons, aids in higher quality software delivery. It should take a day or so to implement, depending on the availability of versioning-enabled wiki within your organization.

## Conclusion

Imperative Gherkin obfuscates the essential behaviors making it nearly worthless as a communication tool. In addition, this style of Gherkin places an additional load on the product team. Thus, bringing down their velocity and quality.

As you can see, CDG is an important element of Contino's software delivery under its pillars of excellence. This version of CDG is the answer to the ills of imperative Gherkin. CDG focuses on the essential system behaviors, which greatly improves communications between product teams and stakeholders. Coupling this style of Gherkin with the aforementioned add-ons creates a powerful automated acceptance test suite. Over time, this test suite puts less strain on the product team. Thereby, improving their quality and velocity.

## Next Steps

Want to see CDG in action? Then look at the demo app located here: <https://github.com/contino/cucumber-declarative-gherkin>.

---

*Tags: Testing, BDD, Cucumber, Gherkin*