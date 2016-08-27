export const UPDATE = 'EXERCISE: Update';
export const INSERT_QUESTION = 'EXERCISE: Insert Question';

export function insertQuestion(exerciseId: string, questionId: string) {
  return {
    type: INSERT_QUESTION,
    exerciseId,
    questionId
  }
}