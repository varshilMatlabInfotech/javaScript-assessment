const assert = require("node:assert/strict");
const path = require("node:path");
const { users } = require("../../candidate-pack/src/assessment-data");

const EXPECTED_TRANSFORMED_USERS = [
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
];

const EXPECTED_ACTIVE_USERS = ["Rahul", "Neha", "Priya"];

const EXPECTED_EXPERIENCE_LEVELS = {
  Rahul: "mid",
  Neha: "junior",
  Priya: "mid"
};

const EXPECTED_GROUPED_USERS = {
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
};

const EXPECTED_SKILL_FREQUENCY = {
  js: 1,
  react: 2,
  css: 1,
  node: 1,
  mongodb: 1
};

function cloneUsers() {
  return structuredClone(users);
}

function loadSolution(solutionPath) {
  const resolvedPath = path.resolve(solutionPath);
  const solutionModule = require(resolvedPath);
  const solveAssessment =
    typeof solutionModule === "function"
      ? solutionModule
      : solutionModule.solveAssessment;

  if (typeof solveAssessment !== "function") {
    throw new TypeError(
      "Solution file must export a function directly or as solveAssessment."
    );
  }

  return { solveAssessment, resolvedPath };
}

function getResult(solveAssessment) {
  const inputUsers = cloneUsers();
  const originalSnapshot = cloneUsers();
  let output;

  try {
    output = solveAssessment(inputUsers);
  } catch (error) {
    return {
      inputUsers,
      originalSnapshot,
      executionError: error instanceof Error ? error : new Error(String(error))
    };
  }

  if (!output || typeof output !== "object" || Array.isArray(output)) {
    throw new TypeError("Solution must return a single output object.");
  }

  return { inputUsers, originalSnapshot, output };
}

function runCheck(name, check) {
  try {
    check();
    return { name, passed: true };
  } catch (error) {
    return {
      name,
      passed: false,
      message: error instanceof Error ? error.message : String(error)
    };
  }
}

function printSummary(results, solvedPath) {
  const total = results.length;
  const passed = results.filter((result) => result.passed).length;

  console.log(`Assessment file: ${solvedPath}`);
  console.log("");

  results.forEach((result, index) => {
    const marker = result.passed ? "PASS" : "FAIL";
    console.log(`${index + 1}. [${marker}] ${result.name}`);

    if (!result.passed) {
      console.log(`   ${result.message}`);
    }
  });

  console.log("");
  console.log(`Score: ${passed}/${total}`);
  console.log(`Status: ${passed === total ? "All checks passed" : "Some checks failed"}`);
}

function main() {
  const solutionPath =
    process.argv[2] || path.join(__dirname, "..", "..", "candidate-pack", "src", "candidate-solution.js");
  const { solveAssessment, resolvedPath } = loadSolution(solutionPath);
  const { inputUsers, originalSnapshot, output, executionError } = getResult(solveAssessment);

  if (executionError) {
    const failedResults = Array.from({ length: 8 }, (_, index) => ({
      name: `Task ${index + 1}: not evaluated`,
      passed: false,
      message: `Solution threw an error before grading: ${executionError.message}`
    }));

    printSummary(failedResults, resolvedPath);
    process.exitCode = 1;
    return;
  }

  const results = [
    runCheck("Task 1: deep copy keeps original array unchanged", () => {
      assert.ok(
        Array.isArray(output.transformedUsers),
        "Return object must include transformedUsers as an array."
      );
      assert.deepStrictEqual(inputUsers, originalSnapshot);
      assert.notStrictEqual(
        output.transformedUsers,
        inputUsers,
        "transformedUsers must be a new array, not the original users array."
      );
      assert.equal(
        output.transformedUsers.length,
        inputUsers.length,
        "transformedUsers should contain all users after deep copy."
      );
      assert.notStrictEqual(
        output.transformedUsers[0],
        inputUsers[0],
        "Each copied user should be a new object reference."
      );
      assert.notStrictEqual(
        output.transformedUsers[0].skills,
        inputUsers[0].skills,
        "Nested arrays like skills should also be deep copied."
      );
      assert.notStrictEqual(
        output.transformedUsers[0].scores,
        inputUsers[0].scores,
        "Nested arrays like scores should also be deep copied."
      );
      assert.equal(inputUsers[0].skills.length, 3);
      assert.equal("skillCount" in inputUsers[0], false);
      assert.equal("totalScore" in inputUsers[0], false);
    }),
    runCheck("Task 2: duplicate skills removed and skillCount added", () => {
      assert.deepStrictEqual(
        output.transformedUsers.map((user) => ({
          id: user.id,
          skills: user.skills,
          skillCount: user.skillCount
        })),
        EXPECTED_TRANSFORMED_USERS.map((user) => ({
          id: user.id,
          skills: user.skills,
          skillCount: user.skillCount
        }))
      );
    }),
    runCheck("Task 3: totalScore calculated for each user", () => {
      assert.deepStrictEqual(
        output.transformedUsers.map((user) => ({
          id: user.id,
          totalScore: user.totalScore
        })),
        EXPECTED_TRANSFORMED_USERS.map((user) => ({
          id: user.id,
          totalScore: user.totalScore
        }))
      );
    }),
    runCheck("Task 4: active users filtered and names stored", () => {
      assert.deepStrictEqual(output.activeUsers, EXPECTED_ACTIVE_USERS);
    }),
    runCheck("Task 5: experience levels assigned correctly", () => {
      assert.deepStrictEqual(output.experienceLevels, EXPECTED_EXPERIENCE_LEVELS);
    }),
    runCheck("Task 6: total unique active-user skills counted correctly", () => {
      assert.equal(output.totalUniqueSkills, 5);
    }),
    runCheck("Task 7: active users grouped by language in required shape", () => {
      assert.deepStrictEqual(output.groupedUsers, EXPECTED_GROUPED_USERS);
    }),
    runCheck("Task 8: skill frequency map built correctly", () => {
      assert.deepStrictEqual(output.skillFrequency, EXPECTED_SKILL_FREQUENCY);
    })
  ];

  printSummary(results, resolvedPath);

  const failed = results.some((result) => !result.passed);
  process.exitCode = failed ? 1 : 0;
}

main();
