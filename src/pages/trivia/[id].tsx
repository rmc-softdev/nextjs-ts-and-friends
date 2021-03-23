import React,  { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { handleFetchTrivia } from '../../api/api'
 

const Trivia = () => {
    const [notFound, setNotFound] = useState(false)
    const router = useRouter()
    const triviaID = +router.query.id 
    const {data, error, isLoading, isFetched} = useQuery('triviaInfo', handleFetchTrivia)


  //   //find trivia
    const [trivia, setTrivia] = useState(null)
    useEffect(() => {
      if (data?.length !== 0) {
        const trivia  = data?.filter((_, index) => index + 1 === triviaID)

        if (trivia?.length) {
          console.log(triviaID, trivia)
          setTrivia(trivia[0])
        }

  } 
  }, [data])



    const renderFetchResp= () => {
        if (error) {
          return <p> something went wrong </p>
        }
      
        if (isLoading) {
          return <p> loading </p>
        }

        if (isFetched && !trivia?.category) {
          return <p> nothing was found</p>
        }
    
        return <div> {trivia?.category} </div>

      }
      
    return (<div>
        {renderFetchResp()}
        {notFound && <div> Sorry, we couldn't find your question now. </div>}
    </div>)
}

export default Trivia
