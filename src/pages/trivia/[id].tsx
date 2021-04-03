import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/[id].module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentQuestions } from "../../reducers/triviaReducer";
import { getGivenAnswers, setStoredAnswer } from "../../reducers/userFeedReducer";
import {trivia} from '../../types/trivia'


const Trivia = () => {
  const router = useRouter();
  const triviaID = +router.query.id!;
  const [trivia, setTrivia] = useState<trivia>()
  const {triviaQuestions: { questions, loading, error}} = useSelector(getCurrentQuestions)
  const { answers } = useSelector(getGivenAnswers)
  const [givenAnswer, setGivenAnswer] = useState(false)



  const dispatch = useDispatch()
  
  useEffect(() => {
    if (questions && Object.keys(questions).length !== 0) {
      const trivia = questions?.filter((_, index) => index + 1 === triviaID);

      if (trivia?.length) {
        setTrivia(trivia[0]);
      } else {
        setTrivia(undefined)
      }
    }
    return setGivenAnswer(false)
  }, [questions, triviaID]);


  useEffect(() => {
  answers.forEach(el => {
    if (el.id === triviaID) {
      setGivenAnswer(el.givenAnswer)
    }
  })
  }, [answers, triviaID])

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
      }}> try again from the start. </span> </p>;
    }

    

    if (!loading && !trivia) {
    return <p>No such question was found</p>
    }


    return (
      <section className={styles.triviContainer}>
        <div>
          <p>Category</p>
          <p> {trivia?.category} </p>
        </div>
        <div>
          <p> Question</p>
          <p> {trivia?.question} </p>
        </div>
        <div>
          <label htmlFor="trivia__answer">
            Mark correct for true or leave it blank for false
          </label>

          <input
            type="checkbox"
            id="trivia__answer"
            onChange={() => setGivenAnswer(!givenAnswer)}
            checked={givenAnswer}
          />
        </div>
        <h4> Current answer: {givenAnswer? 'true' : 'false'} </h4>
        <p> You're seeing: {triviaID} out of {questions.length} questions</p>
        <div>
        {<button 
        disabled={triviaID === 1}
        onClick={() => {
         if (triviaID <= questions?.length) {
          dispatch(setStoredAnswer({
            id: triviaID,
            correctAnswer: trivia?.correct_answer === 'True' ? true : false,
            givenAnswer,
            trivia
          }))
      }
      return router.push(`/trivia/${triviaID - 1}`)
      }} > save answer and go to the previous question</button>}
        <button onClick={() => {
          if (triviaID <= questions?.length) {
            dispatch(setStoredAnswer({
              id: triviaID,
              correctAnswer: trivia?.correct_answer === 'True' ? true : false,
              givenAnswer,
              trivia
            }))
        }

        if (triviaID === questions.length) {
          return router.push('/trivia/results')
        } 

        return router.push(`/trivia/${triviaID + 1}`)
      }}> 
        {triviaID === questions?.length ? <strong className={styles.error}> Submit answers </strong> : 'save answer and go to the next question'}
      </button>
      </div>
      </section>
    )
  };

  return (<>
      <div>{renderFetchResp()}</div>
      
  </>);
};

export default Trivia;
