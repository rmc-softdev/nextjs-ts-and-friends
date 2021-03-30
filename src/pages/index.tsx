import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

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

const Home = () => {
  const router = useRouter();

  const [reqStatus, setReqstatus] = useState<reqStatus>({
    loading: false,
    done: false,
    error: false,
    data: undefined,
    message: "",
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

  const { error, message, done, data, loading: isLoading } = reqStatus;

  const renderFetchResp = () => {
    if (error) {
      return <p> this should be awesome error message, {message} </p>;
    }

    if (isLoading) {
      return <p> this could be an awesome loading spinner </p>;
    }

    if (done && !data) {
      return <p> Invalid server response </p>;
    }

    return (
      <div>
        {Array.isArray(data) &&
          data?.map((el, index) => <div key={index}> {el.category} </div>)}
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
