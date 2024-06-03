import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { RxAvatar } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";
import S from './profile.styles'
import Image from 'next/image';

const Profile = () => {
  const {data: session} = useSession()
  return (
    <S.Profile
      onClick={() => signIn()}
    >
      {
        session === null ?
        <RxAvatar
          style={{
            fontSize: '2rem'
          }}
        /> :
        <Image
          alt={session?.user?.name ?? ''}
          src={session?.user?.image ?? ''}
          width={30}
          height={30}
          style={{
            borderRadius: '50%'
          }}
        />
      }
      {
        session === null &&
        <S.Chevron>
          <span>{session === null ? 'Login' : 'Sing out'}</span>
          <FaChevronRight/>
        </S.Chevron>
      }
    </S.Profile>
  )
}

export default Profile
