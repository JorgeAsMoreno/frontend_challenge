import React from 'react'
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { TbMovie, TbSearch } from "react-icons/tb";
import { FaHouse } from "react-icons/fa6";
import MenuItem from '../MenuItem/MenuItem'
import { signIn } from 'next-auth/react';
import S from './sidebar.styles'
import { GrLogin } from "react-icons/gr";

const Sidebar = () => {
  return (
    <nav className='nav_sidebar'>
      <MenuItem
        icon={<FaHouse />}
        path='/'
      />
      <MenuItem
        icon={<PiTelevisionSimpleBold />}
        path='/tv-series'
      />
      <MenuItem
        icon={<TbMovie />}
        path='/movies'
      />
      <MenuItem
        icon={<TbSearch />}
        path='/search'
      />
      <S.Session>
        <GrLogin
          onClick={() => signIn()}
        />
      </S.Session>
    </nav>
  )
}

export default Sidebar
