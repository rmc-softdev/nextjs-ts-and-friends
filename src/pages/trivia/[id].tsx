import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/[id].module.scss";

interface trivia {
  category: string;
  question: string;
}
interface reqStatus {
  data?: trivia[];
  loading: boolean;
  done: boolean;
  error: boolean;
  message: string;
}

const Trivia = () => {
  const router = useRouter();
  const triviaID = +router.query.id!;
  const [reqStatus, setReqstatus] = useState<reqStatus>({
    loading: false,
    done: false,
    error: false,
    data: undefined,
    message: "",
  });

  const { error, message, done, data, loading: isLoading } = reqStatus;

  const [answer, setAnswer] = useState(false);
  const [trivia, setTrivia] = useState({
    category: "",
    question: "",
  });

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setReqstatus((prevState) => {
          return { ...prevState, loading: true };
        });

        const data = await (
          await fetch(
            "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
          )
        ).json();

        setReqstatus((prevState) => {
          return {
            ...prevState,
            loading: false,
            data: data.results,
            done: true,
          };
        });
      } catch (error) {
        setReqstatus((prevState) => {
          return { ...prevState, loading: false };
        });
        setReqstatus((prevState) => {
          //we'd typically align with the backend what's the error obj
          return {
            ...prevState,
            error: true,
            message: error.message,
            done: true,
          };
        });
      }
    };

    handleFetch();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      const trivia = data?.filter((_, index) => index + 1 === triviaID);

      if (trivia?.length) {
        setTrivia(trivia[0]);
      }
    }
  }, [data, triviaID]);

  const renderFetchResp = () => {
    if (error) {
      return <p> this should be awesome error message, {message} </p>;
    }

    if (isLoading) {
      return <p> this could be an awesome loading spinner </p>;
    }

    if (done && !trivia?.question) {
      return <p> no such trivia was found</p>;
    }

    return (
      <section className={styles.trivia}>
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
      </section>
    );
  };

  return <div>{renderFetchResp()}</div>;
};

export default Trivia;
