import React from 'react'
import styled from 'styled-components';

function Footer() {
  return (
    <Stdiv>
      <StSpan>Wor__d</StSpan>
      <StSpan>Copyright 2023. A10. All Rights Reserved.</StSpan>

    </Stdiv>
    
  )
}
const Stdiv = styled.div`
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #171717;

  line-height: 30px;
`
const StSpan = styled.span`
  color: #989898;
`

export default Footer