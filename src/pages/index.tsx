import { useQuery } from 'react-query'
import styles from '../../styles/Home.module.css'
import { handleFetchTrivia } from '../api/api'
import { useRouter } from 'next/router'



const Home = () => {
  const router = useRouter()

  const {data, error, isLoading} = useQuery('triviaInfo', handleFetchTrivia)

  const renderFetchResp= () => {
    if (error) {
      return <p> something went wrong </p>
    }
  
    if (isLoading) {
      return <p> loading </p>
    }

    return <div> 
      {data.map((el, index) => <div key={index} onClick={() => router.push(`/trivia/${index + 1}`)}> {el.category} </div>)}
    </div>
  }


  return (
    <>
    <section className={styles.container}>
     <h1>  Welcome to the Trivia Challenge </h1>
     <h4> You may start the game at any moment by pressing start </h4>
     <button onClick={() => {
       router.push('/trivia/1')
     }}> Start </button>
    </section>

    <div> 
     {renderFetchResp()}
    </div>

    </>

  )
}


export default Home
