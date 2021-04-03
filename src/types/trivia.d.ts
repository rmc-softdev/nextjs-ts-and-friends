export interface trivia {
    category: string;
    question: string;
    correct_answer: string
  }

export interface triviaResp {
    data: {
        results: trivia[]
    }
}

export interface triviaQuestions {
    questions?: trivia[];
    loading: boolean;
    error: boolean;
  }