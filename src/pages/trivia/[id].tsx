import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/[id].module.scss";
import { useSelector } from "react-redux";
import { getCurrentQuestions } from "../../reducers/triviaReducer";

interface trivia {
  category: string;
  question: string;
}

const Trivia = () => {
  const router = useRouter();
  const triviaID = +router.query.id!;
  const [trivia, setTrivia] = useState<trivia>()
  const [answer, setAnswer] = useState(false)

  const {triviaQuestions: { questions, loading, error}} = useSelector(getCurrentQuestions)
  
  useEffect(() => {
    if (questions && Object.keys(questions).length !== 0) {
      const trivia = questions?.filter((_, index) => index + 1 === triviaID);

      if (trivia?.length) {
        setTrivia(trivia[0]);
      } else {
        setTrivia(undefined)
      }
    }
  }, [questions, triviaID]);

  const renderFetchResp = () => {
    if (error) {
      return <p className={styles.error}> this should be awesome error message, {error} </p>;
    }

    if (loading) {
      return <p> this could be an awesome loading spinner </p>;
    }

    if (!loading && !questions) {
      return <p> Something went wrong, please <span className={styles.error} onClick={() => {
        router.push('/')
      }}> try again </span> </p>;
    }

    if (!loading && !trivia) {
    return <p>No question was found</p>
    }

    return (
      <section className={styles.triviContainer}>
        <div>
          {" "}
          <p>Category</p>
          <p> {trivia?.category} </p>
        </div>
        <div>
          <p> Question</p>
          <p> {trivia?.question} </p>
        </div>
        <div>
          <label htmlFor="trivia__answer">
            {" "}
            Mark correct for true or leave it blank for false
          </label>

          <input
            type="checkbox"
            id="trivia__answer"
            onChange={() => setAnswer(!answer)}
            checked={answer}
          />
        </div>
        <h4> Current answer: {answer? 'true' : 'false'} </h4>
      </section>
    )
  };

  return (<>
      <div>{renderFetchResp()}</div>
      <div>
        <button onClick={() => {
        router.push(`/trivia/${triviaID - 1}`)
      }} > go to the previous question</button>
        <button onClick={() => {
        router.push(`/trivia/${triviaID + 1}`)
      }}> go to the next question</button>
      </div>
  </>);
};

export default Trivia;
