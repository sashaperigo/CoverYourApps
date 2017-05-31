# Module Text JSON Specification

## A brief description of how this is organized

Each module's content is described in a JSON file (e.g. [`phishing.json`](phishing.json)) in this directory. These JSON files are organized according to the following hierarchy:

* A module is an array of **section** objects
* Each **section** object has an attribute *sectionTitle* (string) and an attribute *slides* which is an array of **slide** objects.
* Each **slide** object has an attribute *slideType* (string) and then a number of other attributes.

```
[
  {
    "sectionTitle": string,
    "slides": [
      {
        "slideType": string,
        ...
      },
      ...
    ]
  },
  ...
]
```

The slideType determines which component we use to load the current *slide* into the module: e.g. we'll use [/app/components/textImage](/app/components/textImage) for the slides with *slideType* "textImage."

Some of the *slideType*s are reused for many slides. These depend on the attributes of their **slide** object to render them (load their text content, images, etc).

Other slideTypes are one-off interactive formats and load content that is hardcoded into their component.

Here are our current slideTypes with their attributes (will try to update as we add more):

## slideTypes that are used many times

### text
A slide that fills the whole screen and just displays text. (Actually, doesn't have to be just text: render any chunk of HTML)

#### Attributes:
* *text*: A string of HTML (remember to escape quotation marks ugh) to render.
* *title* (optional): A string that's the title of the slide, if it has one, to be rendered real big

#### Example
```
{
  "slideType": "text",
  "title": "Be wary of corporate account spoofs",
  "text": "Spoofs of corporate accounts are often very realistic and difficult to detect. A casual look through your inbox would typically not halt at the sight of \"googlemail.\" But it’s still crucial to be extremely critical when an email account asks you for personal information; make sure to verify that those addresses actually correspond to email service names."
}
```
---

### textImage
A slide that (by preliminary design) will display some text in a left column and an image on the right side of the screen

#### Attributes:

* *text*: A string of HTML to render on the left side
* *title* (optional): A string that's the title of the slide, to be rendered above the image
* *imageSrc*: A string that is the URL of the image. (For now, assuming we keep storing these images in the same place, should start `img/module-img/...`
* *imageCitation* (optional): A URL to where the image came from

#### Example
```
{
  "slideType": "textImage",
  "text": "On May 3, 2017, you may have received an email from a friend that said \"[friend’s name] has shared a document on Google Docs with you.\" Inside, you would have seen an email like the one on the right. It looks legitimate, including to the blue button used across multiple Google apps.",
  "imageSrc": "img/module-img/google-docs-screenshot.jpg",
  "imageCitation": "https://twitter.com/zeynep/status/859840026082988038"
}
```
---

### quiz
A slide with an interactive multiple choice "quiz" with as many options as you'd like. The user's response gets immediate feedback (how they did, how other people responded) and their answer is saved to the database..

#### Attributes

* *text*: A string of HTML that is the question presented to the user
* *options*: An array of any number of **option** objects, each of which contains the following:
  * *text*: A string which is the multiple choice option
  * *correct*: A boolean of whether or not that's a "correct" answer
  * *feedback*: What the user is told if they choose this option

#### Example
```
{
  "slideType": "quiz",
  "text": "<p>Let's do a mini-quiz based on this simulation. Assume that all correctly-spelled email accounts are legitimate.</p><p>You're representing Russia at this conference. You get an email from head.of.russianfederation@gmail.com. Do you trust it and respond to it?</p>",
  "options": [
    {
      "text": "Yes",
      "correct": true,
      "feedback": "Everything is spelled correctly in this email address, suggesting that this should be an email from a legitimate source."
    },
    {
      "text": "No",
      "correct": false,
      "feedback": "It's important to be cautious of sending any sensitive information over email, and this caution can include scrutinizing email addresses that have contacted you. Everything in this email address was spelled correctly, but it never hurts to exercise caution and request additional proof of identity from a person online."
    }
  ]
}
```
---

### quiz
Like quiz but with a focused image. Not sure how this will be laid out yet.

#### Attributes

* *text*: string - see "quiz"
* *imageSrc*: string - see "textImage"
* *imageCitation*: string - see "textImage"
* *options*: array - see "quiz"

#### Example
```
{
  "slideType": "quiz",
  "intro": "Perhaps you clicked the \"Open in Docs\" button. You were brought to this Google authentication page. Did you also grant authentication to this \"Google Docs\" application?",
  "imageSrc": "img/module-img/google-docs-hack.gif",
  "imageCitation": "https://twitter.com/zachlatta/status/859843151757955072/",
  "options": [
    {
      "text": "Yes",
      "correct": false,
      "feedback": "You and 1 million other Google users fell for this sophisticated phishing attack, which granted this adversary the ability to email from your Gmail account--and disseminate this illegitimate Google Docs email further!"
    },
    {
      "text": "No",
      "correct": true,
      "feedback": "You evaded this phishing attack! If you had fallen for it, this adversary would have gained access to your Gmail account--and disseminate this illegitimate Google Docs email further! There are even more complex phishing attacks out there."
    }
  ]
}
```

## One-off slideTypes (fun interactives)

### sketchyUrl
TODO

### emailSimulation
TODO
