---
title: "Checkwoods"
subtitle: "Invasive Species Tracking System - A centralized database to effectively track and manage data regarding invasive species."
route: "https://www.checkwoods.com"
date: '2023-07-18'
tags: ['Scientific', 'FullStack', 'Data Orientated']
draft: false
---

This document serves to outline the architecture, background, design process, system features, and future improvements of the system.

## I. Introduction

The Checkwoods project, still in development as of `2023-08-29`, has a special significance to me. It was the first project I worked on as part of a team, working with Berkeley student [Jake Bildy](https://ca.linkedin.com/in/jakebildy) and in collaboration with scientists to tackle the absence of a centralized database to effectively track and manage data regarding invasive species.

### Project Overview

The main goal of this project is to develop an integrated application capable of scanning plants and collecting location data, thereby aiding in the identification and tracking of invasive species.
[Checkwoods V1 Preview](/posts/projects/checkwoods-v1-video-home-view.mov)

## II. Architecture

### System Architecture

The system is composed of three main components: a mobile application, a backend database, and a frontend interface.

1. **Mobile Application:** The application will allow users to scan plants and automatically capture location data. This is made possible using AI technology, which will identify the plant species.

2. **Backend Database:** All data collected through the app, including species identification and location, will be logged in the central database. This repository will serve as a comprehensive source of information for researchers and conservationists.

3. **Frontend Interface:** Users will have access to a frontend interface where they can filter and navigate through the database. This will allow users to quickly locate information about specific species or geographical regions.

The system will also incorporate gamification elements within the mobile application, encouraging user participation and interaction.

### Tech Stack

The application will use the following technologies:

- **Frontend:** The interface will be built with Next.js, deployed on Vercel.
- **Backend:** The server-side logic will be handled by Express.js, with MongoDB serving as the main database.
- **Mobile Application:** The cross-platform application will be developed using Flutter.

### Website Overview

The website provides a platform for users to view and visualize recent data, get an overview of the project, and leave feedback, improving system functionalities and user experience over time.

**Website Views:**

The website will have the following views:

- **Landing Page:** Introduction to the project and its purpose.
- **Data Map View:** A visual representation of the data, showing where certain species are located.
- **Spreadsheet View:** Tabular data representation for detailed study.
- **Data Insights View:** Analytical data representation and trends.
- **Donation View:** Allow users to donate a monthly or a one time contribution to help cover our overhead.

[Checkwoods V1 Data Preview](/posts/projects/checkwoods-v1-video-data-view.mov)

## III. Development Roadmap

### Current Features

We're currently working on our backend, using ai to identify the scanned plants for identification. We're also in contact with scientists to help us gain a better understanding of what data features are needed to be most useful for them. Development work will pickup again in `2023-09-10` and we hope to have an alpha launch `2023-12-01`

### Additional Features

1. **User Profiles:** Create user profiles that can store personal data, past submissions, and any in-app achievements (if the gamification aspect is implemented). User profiles can increase user engagement and help build a community around the application.

2. **Notifications and Alerts:** Users could receive notifications for changes in species status in their area of interest, updates on their submissions, or new features in the app.

3. **User Badges or Points:** To support the gamification aspect, you could introduce badges or points for certain achievements, like submitting a certain number of reports, identifying a rare species, etc.

4. **Admin Dashboard:** An administrator dashboard for managing users, data, and other system aspects. This can help ensure the quality of the data in the system.

5. **Data Export:** Allow users to export the data (in formats such as CSV or Excel), which can be very helpful for research or reporting purposes.

6. **Social Sharing:** The ability for users to share interesting finds or achievements on social media platforms directly from the app.

7. **Data Verification System:** Implement a system to verify the data submitted by users. This could be through community moderation or a review by experts. This can increase the reliability of the data in the system.

8. **Interactive Tutorials and Guides:** For new users, these guides can provide an understanding of how to use the app and what to look for when identifying species.

9. **Localized Content:** The app could automatically present content based on the user's location, such as invasive species common in their area or local conservation efforts they could participate in.

10. **In-App Support and Feedback:** Provide a system for users to ask questions, report issues, and give feedback directly within the app.
