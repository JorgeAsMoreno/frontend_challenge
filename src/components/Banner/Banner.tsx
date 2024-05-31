import { IResponseData, IReviews } from '@/types/Request'
import React, { useEffect, useState } from 'react'
import S from './banner.styles'
import { insecureFetchFromAPI } from '@/requests/api'
import { REQUESTS } from '@/utils/constants'
import { useSession } from 'next-auth/react'
import RatingReview from '../RaitingReview/RaitingReview'
import Profile from '../Profile/Profile'

interface IBanner {
  randomItem: IResponseData
}

const Banner = ({ randomItem }:IBanner) => {
  const [reviews, setReviews] = useState<IReviews>({
    id: 0,
    total_results: 0
  })
  const { data: session } = useSession()

  useEffect(() => {
    insecureFetchFromAPI(REQUESTS.getMovieReviews(randomItem?.id)).then(({data}) => {
      setReviews(data)
    }).catch(error => {
      console.error(error)
    })
  }, [])

  return (
    <S.Header backdroppath={randomItem?.backdrop_path}>
      <S.Session>
        <Profile />
      </S.Session>
      <S.Contents>
        <S.MovieTitle>
          {randomItem?.title || randomItem?.original_title || randomItem?.name}
        </S.MovieTitle>
        <S.MovieStats>
          <S.Stat>
            <RatingReview
              rating={randomItem?.vote_average}
            />
          </S.Stat>
          <S.Stat>•</S.Stat>
          <S.Stat>
            {reviews?.total_results} Reviews
          </S.Stat>
          <S.Stat>•</S.Stat>
          <S.Stat>
            {
              randomItem?.release_date?.slice(0,4) ||
              randomItem?.first_air_date?.slice(0,4)
            }
          </S.Stat>
        </S.MovieStats>
        <S.MovieDescription>
          {randomItem?.overview}
        </S.MovieDescription>
      </S.Contents>
    </S.Header>
  )
}

export default Banner
