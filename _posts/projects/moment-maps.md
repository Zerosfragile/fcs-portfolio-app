---
title: "MomentMaps"
subtitle: "Connect, Pin, Remember. A social media app that's all about sharing stories, exploring the world, and reconnecting with cherished memories."
route: "https://www.momentmaps.ca"
date: "2023-05-22"
tags: ["Maps", "API", "SQL"]
draft: false
---

# MomentMaps - System Design Document

THIS DOCUMENT SERVES TO OUTLINE THE ARCHITECTURE, BACKGROUND, DESIGN PROCESS, SYSTEM FEATURES, AND FUTURE IMPROVEMENTS OF THE SYSTEM.

## Table of Contents

## I. Introduction

Hey there, fellow memory-makers! Have you ever wished you could capture and share your favorite moments in a more unique and interactive way? Well, get ready to embark on an incredible journey with MomentMaps—a social media app that's all about sharing stories, exploring the world, and reconnecting with cherished memories.

### User Stories

#### Sharing a Breathtaking Moment

Picture yourself on a serene beach, witnessing a breathtaking sunset that fills the sky with vibrant hues. With MomentMaps, you can capture this awe-inspiring moment, attach it to the exact spot on the map, and share it with the world. Let others experience the joy, beauty, and tranquility of that magical sunset as if they were right there with you.

#### Reconnecting with Unforgettable People

Imagine you met someone during your vacation—a person who left a lasting impression on your heart. With MomentMaps, you have a chance to reconnect. Leave a "moment marker" on the map, sharing the location and date of your encounter. Who knows? That special someone might just stumble upon it, reigniting the sparks and creating a chance for beautiful memories to blossom once again.

#### Discovering a Vibrant Global Community

Scroll through time on MomentMaps and dive into a vibrant global community of memory-makers. Explore a tapestry of shared moments, diverse cultures, and personal experiences from around the world. Connect with like-minded souls, interact with their stories, and broaden your horizons with new perspectives. It's an extraordinary journey of exploration and connection that transcends borders and spans across time.

### Project Overview

![Post Preview](/posts/projects/preview-moment-maps.png)

## II. Abstract Architecture

```text
MomentMaps
├── app
│   ├── api
│   │   └── moments
│   └── page
├── MomentMap
│   ├── Main
│   ├── Hud
│   ├── Markers
│   └── Add
└── Database-Server-Functions
    ├── schema
    ├── upload
    ├── drop
    └── seed
```

## III. Technical Considerations

In this project, we leverage Next.js on Vercel with React to create a seamless user experience. To integrate the mapping functionality, we utilize the powerful Google Maps API, allowing users to pin their moments to specific locations on the map. Additionally, we leverage the new Vercel SQL Storage Database to efficiently store and manage user data, ensuring a smooth and reliable performance.

## IV. Future Developments

We have an exciting roadmap ahead for MomentMaps, with several features and enhancements in the pipeline. Here are some of the future developments we're working on:

1. **Time-Based Scrolling**: We understand the importance of scrolling through time to relive and explore memories. That's why we're developing a time-based scrolling feature, enabling users to navigate through moments based on specific dates or timeframes, creating a truly immersive and chronological journey.

2. **User Authentication**: To provide a personalized and secure experience, we're implementing user authentication. Users will have the option to log in using their Google, Instagram, Twitter, Discord, Snapchat, or other linked accounts, ensuring convenience and privacy.

3. **User Friend System**: We believe that connections and friendships are the heart of any social platform. That's why we're building a user friend system, allowing users to connect with each other, follow their friends, and share moments directly with their trusted circle.

4. **User Direct Messaging System**: Communication is key, and we're working on a direct messaging system that will enable users to have private conversations, share moments privately, and stay connected with their friends and acquaintances within the MomentMaps community.

These are just a few of the exciting developments we have planned for MomentMaps. We're committed to continuously improving and expanding our app to provide you with the best possible experience. Stay tuned for more updates and surprises along the way!

### Contact

For further inquiries or questions, please contact the developer at Marcus@fragileservices.com
