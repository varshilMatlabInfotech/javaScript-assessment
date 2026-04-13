# JavaScript Assessment

Time: 45-50 minutes

## Problem Statement

You are given the following array of user objects. Perform all transformations on a deep copy so that the original array is never modified.

```js
const users = [
  {
    id: 1,
    name: "Rahul",
    age: 28,
    skills: ["js", "react", "js"],
    scores: [10, 20, 30],
    language: "en",
    active: true
  },
  {
    id: 2,
    name: "Amit",
    age: 32,
    skills: ["js", "node"],
    scores: [15, 25],
    language: "hi",
    active: false
  },
  {
    id: 3,
    name: "Neha",
    age: 26,
    skills: ["react", "css", "css"],
    scores: [5, 15, 25],
    language: "en",
    active: true
  },
  {
    id: 4,
    name: "Priya",
    age: 30,
    skills: ["node", "mongodb", "node"],
    scores: [20, 30],
    language: "hi",
    active: true
  }
];
```

## Tasks

Perform the following transformations step by step. Each step builds on the previous one.

All changes must be applied on a deep copy. Combine all results into a single output structure.

### Task 1: Deep Copy

Create a deep copy of the `users` array. All transformations below must be performed on this copy so that the original `users` array is never modified.

At the end, logging the original `users` should prove it is unchanged:

- skills still contain duplicates
- no extra properties were added

### Task 2: Remove Duplicate Skills and Add Skill Count

For each user in the copied array:

- remove duplicate entries from their `skills` array
- add a new property `skillCount` that holds the number of unique skills

### Task 3: Calculate Total Score

For each user, compute the sum of their `scores` array and store it as a new property `totalScore`.

### Task 4: Filter Active Users

From the transformed array, filter out inactive users and keep only those where `active` is `true`.

Store the names of active users.

### Task 5: Assign Experience Level

Based on each active user's age, add an `experienceLevel` property:

- `age < 28` is `"junior"`
- `age >= 28 && age <= 30` is `"mid"`
- `age > 30` is `"senior"`

### Task 6: Count Total Unique Skills

Collect all unique skills across active users, count them, and add this count as `totalSkills` to each active user.

### Task 7: Group by Language

Group active users by their `language` property.

Each user in the group should be a transformed object containing only:

- `userId`
- `name`
- `skillCount`
- `totalSkills`
- `totalScore`
- `experienceLevel`

### Task 8: Skill Frequency Map

Build a frequency map showing how many active users possess each skill after deduplication.

## Expected Output Shape

**Important: your final returned object must use these exact top-level keys: `transformedUsers`, `activeUsers`, `experienceLevels`, `totalUniqueSkills`, `groupedUsers`, `skillFrequency`.**

Your final output should be a single combined structure containing all step results.

```js
{
  transformedUsers: [
    {
      id: 1,
      name: "Rahul",
      age: 28,
      skills: ["js", "react"],
      skillCount: 2,
      scores: [10, 20, 30],
      totalScore: 60,
      language: "en",
      active: true
    },
    {
      id: 2,
      name: "Amit",
      age: 32,
      skills: ["js", "node"],
      skillCount: 2,
      scores: [15, 25],
      totalScore: 40,
      language: "hi",
      active: false
    },
    {
      id: 3,
      name: "Neha",
      age: 26,
      skills: ["react", "css"],
      skillCount: 2,
      scores: [5, 15, 25],
      totalScore: 45,
      language: "en",
      active: true
    },
    {
      id: 4,
      name: "Priya",
      age: 30,
      skills: ["node", "mongodb"],
      skillCount: 2,
      scores: [20, 30],
      totalScore: 50,
      language: "hi",
      active: true
    }
  ],
  activeUsers: ["Rahul", "Neha", "Priya"],
  experienceLevels: {
    Rahul: "mid",
    Neha: "junior",
    Priya: "mid"
  },
  totalUniqueSkills: 5,
  groupedUsers: {
    en: [
      {
        userId: 1,
        name: "Rahul",
        skillCount: 2,
        totalSkills: 5,
        totalScore: 60,
        experienceLevel: "mid"
      },
      {
        userId: 3,
        name: "Neha",
        skillCount: 2,
        totalSkills: 5,
        totalScore: 45,
        experienceLevel: "junior"
      }
    ],
    hi: [
      {
        userId: 4,
        name: "Priya",
        skillCount: 2,
        totalSkills: 5,
        totalScore: 50,
        experienceLevel: "mid"
      }
    ]
  },
  skillFrequency: {
    js: 1,
    react: 2,
    css: 1,
    node: 1,
    mongodb: 1
  }
}
```

## Deep Copy Verification

Logging the original `users` array at the end must show it is completely unchanged.

- duplicated skills must still be present in the original array
- `skillCount` must not exist on original users
- `totalScore` must not exist on original users
