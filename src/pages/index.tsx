import { useEffect } from "react";
import styles from "../../styles/Home.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentQuestions, getQuestions } from "../reducers/triviaReducer";

const Home = () => {
  const router = useRouter();

  const {triviaQuestions: { questions, loading, error}} = useSelector(getCurrentQuestions)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuestions())
  }, [])

  const renderFetchResp = () => {
    if (error) {
      return <p> this should be awesome error message, {error} </p>;
    }

    if (loading) {
      return <p className={styles.centered}> this could be an awesome loading spinner </p>;
    }

    if (!loading && !questions) {
      return <p> Something went wrong, please try again later </p>;
    }

    return (
      <div>
        
        {questions?.length !== 0?
          <div className={styles.main}> 
            <h4> You'll be facing {questions.length} questions on these topics, you may browse through them and edit them before submitting </h4>
            {questions.map((question, index) => <div  key={index}> {question.category} </div>)}

          </div> : <p> Invalid server response </p>}
      </div>
    );
  };

  return (
    <>
      <section className={styles.container}>
        <h1> Welcome to the Trivia Challenge </h1>
        <h4> You may start the game at any moment by pressing start </h4>
        <button
          onClick={() => {
            router.push("/trivia/1");
          }}
        >
          {" "}
          Start{" "}
        </button>
      </section>

      <div>{renderFetchResp()}</div>
    </>
  );
};

export default Home;
