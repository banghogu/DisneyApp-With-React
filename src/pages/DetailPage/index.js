import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

const DetailPage = () => {
  let { movieId } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await axios.get(
          `/movie/${movieId}`
        )
        setMovie(response.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()

  }, [movieId])

  if (!movie) {
    console.log('No movie')
    return null
  }

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="no movie"
        className='modal__poster-img' />
    </section>
  )

}

export default DetailPage
