import React, { FC } from 'react'

interface Props {

}

export const Card: FC<Props> = (props) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">

          {props.children}

        </div>
      </div>
    </div>
  )
}
