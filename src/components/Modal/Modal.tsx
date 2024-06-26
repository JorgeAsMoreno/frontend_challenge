import { IResponseData, defaultValues } from '@/types/Request'
import React, { Dispatch, useEffect, useState } from 'react'
import S from './modal.styles'
import { insecureFetchFromAPI } from '@/requests/api'
import { BASEURL } from '@/utils/constants'
import { FaExternalLinkAlt } from "react-icons/fa";
import RatingReview from '../RaitingReview/RaitingReview'
import { formatRuntime } from '@/utils/helpers'
import { IoMdClose } from "react-icons/io";
import YouTube from 'react-youtube'
import MovieTrailer from 'movie-trailer'
import { TEASER_OPTIONS } from '@/utils/constants'
import Spinner from '../Spinner/Spinner'

interface IModal {
  id: number
  setOpenModal: Dispatch<boolean>
  requestUrl: any
}

const Modal = ({ id, setOpenModal, requestUrl }: IModal) => {
  const [selectedMovie, setSelectedMovie] = useState<IResponseData>(defaultValues)
  const [trailerUrl, setTrailerUrl] = useState<string | null>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    insecureFetchFromAPI(requestUrl(id)).then(({ data }) => {
      setSelectedMovie(data)
      MovieTrailer(data.title || data.original_title).then(url => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v'))
        setLoading(false)
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }, [id, requestUrl])

  if (loading) {
    return (
      <S.ModalOverlay>
        <S.ModalContainer>
          <Spinner />
        </S.ModalContainer>
      </S.ModalOverlay>
    )
  }

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalLeft>
          <S.Image
            alt={selectedMovie.name || selectedMovie.original_title}
            src={`${BASEURL}${selectedMovie.poster_path}`}
          />
        </S.ModalLeft>
        <S.ModalRight>
          <S.TopContent>
            <S.MovieTitle>{selectedMovie?.original_title || selectedMovie?.name}</S.MovieTitle>
            <IoMdClose
              onClick={() => setOpenModal(false)}
              style={{
                fontSize: '2rem'
              }}
            />
          </S.TopContent>
          <S.MiddleContent>
            <S.Stats>
              <div>
                <RatingReview
                  rating={selectedMovie.vote_average}
                  />
                <S.Stat>•</S.Stat>
                <S.Stat>{(selectedMovie.first_air_date || selectedMovie.release_date).slice(0,4)}</S.Stat>
                <S.Stat>•</S.Stat>
                <S.Stat>{formatRuntime(selectedMovie.runtime)}</S.Stat>
              </div>
              <div>
                <S.GoToMovie href={selectedMovie.homepage} target='_blank'>
                  More info
                  <FaExternalLinkAlt />
                </S.GoToMovie>
              </div>
            </S.Stats>
            <S.Gender>
              {
                selectedMovie.genres.map(item => (
                  <span key={item.id}>{item.name}</span>
                ))
              }
            </S.Gender>
            <p>
              {selectedMovie.overview}
            </p>
          </S.MiddleContent>
            { trailerUrl &&
              <S.BottomContent>
                  <YouTube videoId={trailerUrl} opts={TEASER_OPTIONS} />
              </S.BottomContent>
            }
        </S.ModalRight>
      </S.ModalContainer>
    </S.ModalOverlay>
  )
}

export default Modal
