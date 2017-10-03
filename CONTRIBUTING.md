Contributing to JSDoctor
========================

First and foremost, I would like to thank you for taking the time to contribute. Getting familiar with open source projects might be a hassle. I really hope that once you contribute to JSDoctor, you will feel that it was worth your time and you have done an act of great importance!

## Important!

By contributing to this project, you:

* Agree that you have authored 100% of the content
* Agree that you have the necessary rights to the content
* Agree that you have received the necessary permissions from your employer to make the contributions (if applicable)
* Agree that the content you contribute may be provided under the Project license(s)

## Forms of contribution

Contribution to JSDoctor may come in many different forms and all of them are very welcome:

* Requesting features
* Implemnting a solution for a task in the **TODO** section
* Adding / updating / correcting documentation
* Reporting bugs
* Staring the [project](https://github.com/yashag/jsdoctor)
* Write and share your impressions from the project (on Facebook, Tweeter, Medium or wherever you like)
* Use JSDoctor and tell your fellow friends an co-wrokers about it

If you'd like to learn more about contributing in general, the [Guide to Idiomatic Contributing](https://github.com/jonschlinkert/idiomatic-contributing) has a lot of useful information.

## Issues

### Before creating an issue

Please try to determine if the issue is caused by an underlying library, and if so, create the issue there. Sometimes this is difficult to know. I only ask that you attempt to give a reasonable attempt to find out. If you are certain there is an issue with JSDoctor, please file it in the issues section of its Github repository (you may find the link in the readme).

Try to follow these guidelines

* **Avoid creating issues for implementation help** - It's much better for discoverability, SEO, and semantics - to keep the issue tracker focused on bugs and feature requests - to ask implementation-related questions on [stackoverflow.com][so]
* **Investigate the issue**
* **Check the readme** - the readme may contain an answer to the issue.
* **Look at the unit tests** - while I try to make the readme as clear and detailed as possible, sometimes tests hold more useful information for code usage.
* Create the issue in the appropriate repository.

### Creating an issue

Please be as descriptive as possible when creating an issue. In order to successfully answer your question or address your issue, contributors need the following information in your issue:

* **version**: please note the version of JSDoctor are you using
* **code excerpts** (optional): in many occasions code excerpts and examples can be very useful to understand, recreate and find the issue
* **error messages**: please paste any error messages into the issue, or a [gist](https://gist.github.com/)
* **any other useful information**: like other packages, watchers, compilers, extensions etc. that may cause an interference

Another important part of creating an issue is the **way** it is written. Please, write it in a clear and easily readable way. There are many markdown tutorials out there and I encourage you to make sure your issue is using the features it needs in order to be easily read and understood.

### Closing issues

Maintainers of JSDoctor as well as its original poster may close an issue at any time. Typically, but not exclusively, issues are closed when:

* The issue is resolved
* The project's maintainers have determined the issue is out of scope
* An issue is clearly a duplicate of another issue, in which case the duplicate issue will be linked.
* A discussion has clearly run its course


## Pull requests

Submitting a pull request is stipulated by the following prerequisites:

### Documentation

Please update the relevant documentation. The `README.md` file if it affects the usage of JSDoctor and `jsdoc` comments if a new code was added and it fits the current style of code documentation (or if you see fit to document it);
If `jsdoc` comments were added, please run the following to check that documentation is generated:

```sh
npm run generate:jsdoc
```

### Linting

Before pushing your code, please run eslint to check it and fix the ocurring problems (**errors** and **warninngs** alike).
You may do so by running the following command:

```sh
npm run lint
```

### Tests

Please write unit tests for all the code you added, so there will some sort of assurance that your code is working and it won't be broken in the future. Helping in covering the whole project in tests may prove very useful for the next step as well.

Please run **all** tests and make sure they **pass** before submitting your changes! I can't stress enough the importance of this step. You may do so by running the following command:

```sh
npm test
```

After you have run the tests, I also recommend to generate documentation based on them, to see that no special problems ocurred. This is done by running:

```sh
npm run generate:test-jsdoc
```

### Additional prerequisites

Please make sure to do the following as well:

* Create a branch for each seperate feature you are working on
* Squash you commits into a single one before sending the pull request
* Make sure there are no condflicts. Please rebase off the latest master
* Try to follow the existing conventions and formats to the best of your ability. Most importantly don't change whitespace conventions and make sure your line breaks are `CRLF`


Once again, thanks for reading and taking your time to contribute to JSDoctor in the requested way. It isn't obvius and I appreciate it a lot. Now let's make JSDoctor a great tool for everybody!

[so]: http://stackoverflow.com/questions/tagged/jsdoctor

----------
_This file was created with the help of the [generate-contributing](https://www.npmjs.com/package/generate-contributing) package_