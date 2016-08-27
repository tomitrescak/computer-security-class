declare namespace Cs.Entities {
    interface ISolution {
      _id?: string;
      userId: string;
      user: string;
      semesterId: string;
      practicalId: string;
      exerciseId: string;
      questionId: string;
      userQuestion?: string;
      expectedAnswer?: string;
      userAnswer?: string;
      mark?: number;
      created?: Date;
      modified?: number;
      finished?: boolean;
      tutorComment?: string;
    }

    interface IQuestionPossibilities {
      _id?: string;
      possibilities: IQuestionPossibility[];
    }

    interface IQuestionPossibility {
      question: string;
      answer: string;
    }

    interface IQuestionBase {
      _id?: string;
      description?: string;
      question?: string;
      expectedAnswer?: string;
      control?: "input" | "textbox";
      validation?: string;
      points?: number;
    }

    interface IQuestion extends IQuestionBase {
      possibilities?: IQuestionPossibilities;
    }

    interface IExerciseBase {
      _id?: string;
      name: string;
      instructions: string;
      group?: string;
      points: number;
    }

    interface IExercise extends IExerciseBase {
      questions: IQuestion[];
    }
  }