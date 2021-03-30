import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
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
      return <p> this could be an awesome loading spinner </p>;
    }

    if (!loading && !questions) {
      return <p> Something went wrong, please try again later </p>;
    }

    return (
      <div>
        {Array.isArray(questions) ?
          questions?.map((el, index) => <div  onClick={() => {
            router.push(`trivia/${index + 1}`)
          }} key={index}> {el.category} </div>) : <p> Invalid server response </p>}
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
