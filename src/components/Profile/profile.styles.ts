import styled from "styled-components";

const Chevron = styled.span`
  display: flex;
  transition: .5s;
  opacity: 0;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  gap: .5rem;
  border-radius: 18px;
  border-radius: 50%;
  &:hover {
    ${Chevron} {
      opacity: 1;
    }
  }
`

export default {
  Profile,
  Chevron,
}
