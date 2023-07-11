---
title: "FCS-Portfolio"
subtitle: "My Personal Portfolio Showcasing my Latest Projects"
route: "/"
date: '2023-05-01'
tags: ['next.js', 'node.js', 'react']
draft: false
---

# FCS-Portfolio

## I. Introduction

THIS DOCUMENT SERVES TO OUTLINE THE ARCHITECTURE, BACKGROUND, DESIGN PROCESS, SYSTEM FEATURES, AND FUTURE IMPROVEMENTS OF THE SYSTEM.

### Project Overview

This project was aimed at creating a digital space where I could easily display information about myself, and my latest projects. I used Next.js and used this project to get familiar with react and using node.js packages.
![Post Preview](/projects/FCSPortfolio/preview.png)

## II. Architecture


ABSTRACT FOLDER ARCHITECTURE

```txt
FCS-Portfolio
├── pages
│   ├── api
│   │   └── projects.js
│   ├── projects
│   │   ├── [slug]
│   │   │   └── index.js
│   │   └── index.js
└── projects
    ├── Project-001
    │   └── system-design.md
    ├── Project-002
    │   └── system-design.md
    └── Project-003
        └── system-design.md

```

## III. Background

### Inspiration

Creating a portfolio space had been on my to-do list for a while. However, it wasn't until I completed my first project, the ASCII-HUD project, that I felt compelled to move forward with it. While I was inspired by the [Tailwind Nextjs Blog](https://vercel.com/new/templates/next.js/tailwind-css-starter-blog), I found the architecture too complex for a first-time project. Therefore, I set out to create a simplified version that could be adapted to fit my needs. During my research, I came across a [static markdown blog](https://github.com/pixegami/nextjs-blog-tutorial) that helped me better understand the next.js/react architecture and patterns that I was unfamiliar with.

## IV. Design Process

I had already created an API to feed my project data, but after studying the examples, I decided to rework the API slightly to incorporate the [gray-matter](https://www.npmjs.com/package/gray-matter) package. This allowed me to easily parse metadata directly from the markdown files, which simplified my code and system architecture. Feeling more confident in react, I then built the dynamic route, which enabled me to statically generate the posts.

While experimenting with various packages to parse the markdown content, I settled on [MarkdownIt](https://www.npmjs.com/package/markdown-it) due to its simplicity. I discovered that some of the other markdown parsers struggled with correctly parsing code block content.

At this point, I went back and did some simple refactoring and revisited the [Tailwind Nextjs Blog](https://vercel.com/new/templates/next.js/tailwind-css-starter-blog) now that I had a better understanding of Next.js. I successfully implemented some of their features, such as the draft option, which hides the project.

## V. System Features

### System Overview

The FCS-Portfolio is a personal portfolio website that showcases my latest projects. The website is built using Next.js, Node.js, and React, with the content being sourced from markdown files. The metadata within the markdown files, such as the title, subtitle, date, tags, and draft status, is parsed using the [gray-matter](https://www.npmjs.com/package/gray-matter) package.

### Dynamic Route and Static Post Generation

The FCS-Portfolio features a dynamic route that enables the creator to add new projects to the website easily. By using the [MarkdownIt](https://www.npmjs.com/package/markdown-it) package, I'm able to write markdown content for each project and generate corresponding static posts.

### Meta Data

The FCS-Portfolio website sources metadata for each project from markdown files using the [gray-matter](https://www.npmjs.com/package/gray-matter) package. The metadata tags include:

- Title: the title of the project
- Subtitle: a brief description of the project
- Route: the URL route for the project page
- Date: the date when the project was completed
- Tags: relevant tags associated with the project, such as technologies used
- Draft: a draft option that allows the creator to hide projects until they are ready for public viewing. By default, the draft option is set to `false`. When set to `true`, the project is hidden from the public.

## VI. Future Improvements

The FCS-Portfolio website currently provides a functional platform for showcasing projects, but there are several areas for improvement. Some potential future improvements include:

- [nextra full text search](https://nextra.site): Implementing a search feature that allows users to search for projects based on keywords or tags.
- Tag Filtering: Adding the ability to filter projects by their tags to allow users to quickly find projects that meet their interests or needs.
- CodeBlock Coloured Parsing: Improving the parsing of code blocks to include syntax highlighting and other formatting options to improve readability.
- Comments: Providing users with the ability to leave comments on individual projects to encourage engagement and feedback.
- Performance Improvements: Optimizing the website's performance to ensure fast loading times and smooth navigation, even with a large number of projects.
- Pagination: Incorporating pagination to allow users to navigate through large numbers of projects more easily.
- Automated Preview: Using a server-side puppeteer script to generate automated previews of projects to give users a more in-depth look at each project before clicking through to the full project page.
- Home page UI improvements: Enhancing the design of the home page to make it more visually appealing and user-friendly.
- SEO: Improving the website's search engine optimization to increase visibility and attract more visitors to the website.

### Reflection on Design Process

Reflecting on the design process, I am proud of what I have accomplished so far. While I am satisfied with the current functionality of the website, there are several areas for improvement that I would like to explore in the future.

One area that I would like to focus on is improving the website's performance. With a large number of projects, I want to ensure that the website remains fast and responsive. I am also interested in exploring pagination as a way to make it easier for users to navigate through the projects.

Another area for improvement is the user interface of the home page. While it currently provides the necessary information, I would like to enhance its design to make it more visually appealing and user-friendly.

In addition, I would like to implement a search feature and tag filtering to make it easier for users to find projects that meet their interests or needs. I am also interested in incorporating comments to encourage engagement and feedback.

Finally, I want to improve the website's SEO to increase visibility and attract more visitors to the website. Overall, I am excited to continue working on the website and exploring ways to improve its functionality and design.

## VII. Conclusion

Creating my personal portfolio website was a valuable learning experience for me. Throughout the design process, I gained a better understanding of the Next.js and React frameworks, as well as the importance of system architecture and performance optimization.

I also learned the value of leveraging existing resources, such as the [gray-matter](https://www.npmjs.com/package/gray-matter) package and the [MarkdownIt](https://www.npmjs.com/package/markdown-it) parser, to simplify my code and system architecture.

As I continue to work on the website and explore potential future improvements, I am excited to continue learning and growing as a developer. I look forward to incorporating new tools and techniques to improve the functionality and design of the website, while also further developing my skills as a developer.

### Lessons Learned

One of the most important lessons that I learned throughout the design process was the importance of iterative development. By continually testing and refining my code, I was able to catch errors and make improvements before they became larger issues.

I also learned the value of effective research and problem-solving skills. By utilizing resources such as online tutorials, forums, and documentation, I was able to better understand the Next.js and React frameworks and find solutions to any issues that arose during the development process.

Another important lesson that I learned was the importance of using Git as a version control system. There were a couple of instances where my `git push` failed to compile, but by using Git to its fullest and looking back on the code and the changes, I was able to identify and fix the issues.

Finally, I learned the importance of balancing functionality and design. While the website needed to provide the necessary information and functionality, it was also important to ensure that it was visually appealing and user-friendly. By finding a balance between these two elements, I was able to create a portfolio website that effectively showcases my work while also providing an enjoyable user experience.

### Contact

For further inquiries or questions, please contact the developer at Marcus@fragileservices.com