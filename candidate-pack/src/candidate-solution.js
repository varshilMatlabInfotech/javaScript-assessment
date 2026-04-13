function solveAssessment(users) {
  // Read the full requirements from:
  // /Users/varshil/IdeaProjects/javaScript-assessment/candidate-pack/assessment/assessment.md
  //
  // Use the `users` parameter as the input to your solution.
  // You can view the sample input structure in:
  // /Users/varshil/IdeaProjects/javaScript-assessment/candidate-pack/src/assessment-data.js
  //
  // Write your full solution inside this function and return the final output object.
  // You can use temporary console.log(...) statements here for debugging if needed.

  // Important: the final returned object keys must be:
  // transformedUsers, activeUsers, experienceLevels, totalUniqueSkills, groupedUsers, skillFrequency

  // Task 1:
  // Create a deep copy of `users`.
  // All transformations below must be performed on the copied data only.
  const transformedUsers = [];

  // Task 2:
  // Remove duplicate skills for each user in `transformedUsers`.
  // Add a new property called `skillCount`.

  // Task 3:
  // Calculate the sum of each user's `scores`.
  // Add the result as `totalScore`.

  // Task 4:
  // Filter only active users.
  // Store their names in `activeUsers`.
  const activeUsers = [];

  // Task 5:
  // Based on age, assign `experienceLevel` to each active user.
  // age < 28 => "junior"
  // age >= 28 && age <= 30 => "mid"
  // age > 30 => "senior"
  const experienceLevels = {};

  // Task 6:
  // Count all unique skills across active users.
  // Store the count in `totalUniqueSkills`.
  // Add `totalSkills` to each active user.
  let totalUniqueSkills = 0;

  // Task 7:
  // Group active users by `language`.
  // Each grouped user should contain only:
  // userId, name, skillCount, totalSkills, totalScore, experienceLevel
  const groupedUsers = {};

  // Task 8:
  // Build `skillFrequency` for active users after skill deduplication.
  const skillFrequency = {};

  return {
    transformedUsers,
    activeUsers,
    experienceLevels,
    totalUniqueSkills,
    groupedUsers,
    skillFrequency
  };
}

module.exports = solveAssessment;
