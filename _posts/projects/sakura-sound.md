---
title: "SakuraSound"
subtitle: "Your Personal AI Assistant for Music Playlists Based on Your Mood, Powered by OpenAI and Spotify Integration"
route: "https://sakurasound.vercel.app"
date: '2023-05-01'
tags: ['AI', 'API', 'Spotify']
draft: false
---

# SakuraSound - System Design Document

This document serves as a cornerstone for the SakuraSound, aiming to educate, inform and guide by providing a thorough insight into it's processes, This document ensures an aligned understanding and vision among all stakeholders, propelling the project towards success.

## Table of Contents

## I. Introduction

This system design document provides an in-depth overview of SakuraSound, a revolutionary short-form audio clip application aimed to redefine music discovery. Designed to educate developers, team members, and potential investors, this document outlines both the abstract ideas underpinning SakuraSound's design and philosophy, as well as technical details about the Recommendation Engine and Algorithm, technical considerations, and data security and privacy.

We take an intentional approach to avoid excessive text, focusing instead on providing abstract and comprehensible examples to explain complex concepts. This approach ensures that the document is accessible to both technical and non-technical audiences, promoting a shared understanding of the project.

### Project Overview

SakuraSound is a cutting-edge platform for music discovery, utilizing artificial intelligence and machine learning to provide users with personalized music recommendations. It leverages Spotify's data to understand user preferences and generate unique features for a richer music discovery experience. At the heart of SakuraSound's offering a recommendation algorithm, powered by natural language processing and advanced machine learning algorithms, can provide highly personalized recommendations based on a user's listening history, genre preferences, mood, and more. In addition to its powerful recommendation engine, SakuraSound also offers a social component that allows users to connect with other music enthusiasts and discover new music together. With its intuitive interface and engaging personal assistant, SakuraSound is the ultimate destination for anyone who loves music.

![Post Preview](/projects/SakuraSound/preview.png)
### Technologies

- [React](#react): A popular JavaScript library for building user interfaces.
- [Next.js](#nextjs): A framework built on top of React that adds server-side rendering and other features to enable easier and faster development of web applications.
- [TypeScript](#typescript): A programming language that extends JavaScript by adding static types, improving code quality and maintainability.
- [Framer Motion](#framer-motion): A library for creating fluid animations and gestures in React applications with a focus on performance and ease of use.
- [Spotify API](#spotify-api): A set of APIs provided by Spotify that allow developers to build applications that interact with the Spotify music service, providing access to metadata and features such as search, playback, and user authentication.
- [OAuth](#oauth): An open standard for authentication and authorization that enables third-party applications to access user data from web services such as Google, Facebook, and Twitter, without requiring users to give away their login credentials.


### Project Inspiration and Motivation

The inception of SakuraSound was inspired by a passion for music, artificial intelligence, and foreign cultures, fueled by the desire to bridge the gap between these three distinct areas. The goal is to create a platform that can recommend niche and foreign content to users, providing a unique music discovery experience that breaks away from conventional boundaries.

### Personal Background

As a self-taught software engineer with a deep passion for music and AI, I've always been driven to solve complex problems and build innovative solutions. My journey in computer science began in middle school, where I won 2nd place in a provincial science fair for developing a proof-of-concept neural network. This early achievement ignited a passion for AI and machine learning that has informed my work on projects like SakuraSound.

### Document Purpose

This document aims to provide a comprehensive overview of the system design behind SakuraSound. It details the project's philosophy, abstract and technical architecture, recommendation algorithm, technical considerations, limitations, and future developments. By providing a clear understanding of these elements, this document serves as a valuable resource for the ongoing development and improvement of SakuraSound.

1. **Educate** technical stakeholders about the intricate workings of the system, from architecture to algorithmic details, fostering effective collaboration.
2. **Inform** non-technical parties about the innovative functionalities, potential, and value proposition of SakuraSound, fostering a clear understanding of the project's significance.
3. **Guide** future development by outlining the current system's state, its limitations, and potential enhancements, serving as a roadmap towards a more refined and feature-rich application.

---

In the next sections, we'll dive deeper into the philosophy, architecture, and technical design of SakuraSound, providing abstract examples for clarity.

## II. Abstract Architecture

SakuraSound's abstract architecture revolves around user data obtained from Spotify API, transformed into a unique set of features that serve as a user profile. This profile is then used by our machine learning model to predict the user's musical preference. The ultimate goal is to recommend songs that align with the user's tastes, and potentially, extend their musical horizons.

### Technical Architecture

The technical architecture of SakuraSound comprises three key components:

1. **Data Collection Module:** This module collects and processes data from various sources, including Spotify's API, user device metadata, and SakuraSound's internal databases.

2. **Feature Extraction Module:** This module identifies meaningful features from the collected data. For audio tracks, it extracts features like tempo, key, and loudness. For user data, it identifies patterns in user interactions and interest signals.

3. **Recommendation Module:** This module uses the extracted features to recommend audio tracks to users. It applies machine learning algorithms to predict user preferences and identify similar users. The module then combines these predictions to generate personalized music recommendations.

### Recommendation Algorithm

SakuraSound's recommendation algorithm leverages a hybrid model combining collaborative filtering and content-based filtering. The algorithm is designed to engage users by presenting songs as short-form audio clips and capturing the user's reaction to these clips as valuable data points.

The algorithm also employs strategies to minimize computational load, thereby optimizing costs. For example, it uses Spotify's existing engine to refine the scope of possible songs, then ingests potential songs based on that data.

## III.  Technical Considerations

Technical considerations include finding the balance between adhering to Spotify's terms of service and achieving the project's objectives. Also, the system is designed to handle large amounts of data and heavy computational loads, especially as the machine learning models require substantial data for optimal performance.

Moreover, SakuraSound is designed to deliver a seamless user experience. For instance, videos are streamed in batches of ten at a time, with the last processed data being sent after the fifth video to ensure continuous playback without any wait time.

### Limitations

While SakuraSound is designed to offer a unique music recommendation system, it is currently limited by a few factors:

1. **Data Storage:** The storage and handling of large volumes of user data from the Spotify API is a significant challenge. However, this limitation is somewhat circumvented by transforming raw data into useful features that create a profile of the user.

2. **Legal Restrictions:** The terms of service of Spotify pose certain restrictions on the misuse of their platform, including training machine learning or AI models using their data. However, SakuraSound has developed creative solutions to work within these constraints while still achieving the project's objectives.

3. **Model Complexity:** Designing an effective machine learning model for music recommendation requires a deep understanding of data features and optimal extraction methods. This complexity presents a challenge, but it is also an opportunity for refinement and innovation.

## IV. Future Developments

SakuraSound is envisioned to continuously evolve, guided by insights drawn from user interactions, algorithm performance, and ongoing developments in AI and machine learning. Future enhancements will focus on refining the feature extraction process and expanding the scope of music recommendations. There are also plans to explore ways to further optimize the computational efficiency of the system.

Moreover, the project is committed to pushing the boundaries of personalization in music recommendations, with a focus on promoting diversity and inclusivity in musical genres.

## V. Initial Challenges

One of the main challenges in designing SakuraSound's recommendation algorithm will be competing with established platforms like Spotify. Spotify has a vast amount of user data and sophisticated machine learning models that allow it to deliver highly personalized recommendations to its users.

To compete with Spotify, SakuraSound could consider taking a niche approach, focusing on a specific genre or subculture and offering specialized and accurate recommendations within that niche. Another approach could be to prioritize the user experience and design a platform that is more intuitive and user-friendly than Spotify.

To overcome these challenges, SakuraSound will need to leverage alternative data sources, use innovative machine learning techniques, and differentiate itself through unique features and user experience. It will also need to deeply understand the needs and preferences of its target audience to deliver a compelling and personalized experience.

### Lessons Learned

#### Next-Auth

The `useSession` hook provided by NextAuth.js doesn't work with the App Router out of the box. This is because the App Router does not automatically pass down the session object to child components. To use useSession with the App Router, you may need to wrap your entire application or the specific component that needs access to the `useSession` hook with a `SessionProvider` component.

#### Component Lifecycles

React components have a lifecycle that determines when certain methods are called, such as when the component is mounted, updated, or unmounted. This lifecycle can have a significant impact on when a component re-renders based on passed props. In the `TopItems` component, we have two `useEffect` hooks that are responsible for fetching and processing data from the Spotify API. To ensure that the component re-renders when the `accessToken` prop changes, we include it in the dependency array of the first `useEffect` hook. This means that the hook will be called again with the new `accessToken` value, and the component will re-fetch the data from the API.

To ensure that the component re-renders when the `topTracks` state changes, we include it in the dependency array of the second `useEffect` hook. This means that the hook will be called again with the new `topTracks` value, and the component will re-map the data to JSX elements and set them in state. It's important to note that including too many dependencies in the `useEffect` hook's dependency array can cause unnecessary re-renders and impact performance. Therefore, it's important to only include dependencies that are necessary for the effect to function correctly.

In summary, understanding the React component lifecycle and using the right lifecycle methods and hooks can help us create more efficient and performant components that re-render only when necessary based on passed props. By including only the necessary dependencies in the `useEffect` hook's dependency array, we can ensure that the component stays up-to-date with the latest data while avoiding unnecessary re-renders.

## VI. Conclusion

### Contact

For further inquiries or questions, please contact the developer at Marcus@fragileservices.com

---

By incorporating these technical considerations, developers can build the robust and innovative recommendation engine behind SakuraSound, offering users a personalized and immersive music discovery experience.
