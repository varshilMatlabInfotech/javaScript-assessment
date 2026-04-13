# JavaScript Assessment

This repository is now split into two parts:

- [candidate-pack](/Users/varshil/IdeaProjects/javaScript-assessment/candidate-pack): safe to share with the candidate
- [dno](/Users/varshil/IdeaProjects/javaScript-assessment/dno): keep private because it contains the grading logic

## Recommended Use

1. Share only [candidate-pack](/Users/varshil/IdeaProjects/javaScript-assessment/candidate-pack) with the candidate.
2. Ask them to work in [candidate-pack/src/candidate-solution.js](/Users/varshil/IdeaProjects/javaScript-assessment/candidate-pack/src/candidate-solution.js).
3. Keep [dno](/Users/varshil/IdeaProjects/javaScript-assessment/dno) private.
4. After the interview, run the grader from [dno](/Users/varshil/IdeaProjects/javaScript-assessment/-):

```bash
npm test
```

## Notes

- The candidate pack includes the Markdown task, input data, and the solution file only.
- The interviewer pack includes the automated test runner and expected results.
- This keeps the answer-checking logic out of the candidate-facing materials.
