import Banner from '@/components/Banner/Banner'
import CategoryRow from '@/components/CategoryRow/CategoryRow'
import Container from '@/components/Container/Container'
import Spinner from '@/components/Spinner/Spinner'
import { insecureFetchFromAPI } from '@/requests/api'
import { IResponse } from '@/types/Request'
import { REQUESTS } from '@/utils/constants'
import { Random } from '@/utils/helpers'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
interface IMovies {
  popularMovies: IResponse
  upcomingMovies: IResponse
  topRatedMovies: IResponse
  nowPlayingMovie: IResponse
  pageName: string 
}

const Movies = ({
  popularMovies,
  upcomingMovies,
  topRatedMovies,
  nowPlayingMovie,
  pageName
}: IMovies) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (
      popularMovies &&
      upcomingMovies &&
      topRatedMovies &&
      nowPlayingMovie
    ) {
      setIsLoading(false)
    }
  }, [popularMovies, upcomingMovies, topRatedMovies, nowPlayingMovie])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Banner
        randomItem={Random(popularMovies.results)}
      />
      <CategoryRow
        data={popularMovies.results}
        title="Popular"
        requestUrl={REQUESTS.getMovieDetails}
        type="popular"
        pageName={pageName}
        
      />
      <CategoryRow
        data={upcomingMovies.results}
        title="Upcoming"
        requestUrl={REQUESTS.getMovieDetails}
        type="upcoming"
        pageName={pageName}
      />
      <CategoryRow
        data={topRatedMovies.results}
        title="Top rated"
        requestUrl={REQUESTS.getMovieDetails}
        type="top_rated"
        pageName={pageName}
      />
      <CategoryRow
        data={nowPlayingMovie.results}
        title="Now playing"
        requestUrl={REQUESTS.getMovieDetails}
        type="now_playing"
        pageName={pageName}
      />
    </Container>
  )
}

export default Movies

export const getServerSideProps: GetServerSideProps = async ({resolvedUrl}) => {
  try {
    const popularMoviesData = await insecureFetchFromAPI(REQUESTS.popularMovieList)
    const upcomingMoviesData = await insecureFetchFromAPI(REQUESTS.upcomingMovies)
    const topRatedmovieData = await insecureFetchFromAPI(REQUESTS.topRatedmovieList)
    const nowPlayingMoviesData = await insecureFetchFromAPI(REQUESTS.nowPlaingMovies)

    return {
      props: {
        popularMovies: popularMoviesData.data,
        upcomingMovies: upcomingMoviesData.data,
        topRatedMovies: topRatedmovieData.data,
        nowPlayingMovie: nowPlayingMoviesData.data,
        pageName: resolvedUrl
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        error: 'Failed to fetch data'
      }
    }
  }
}
