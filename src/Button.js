import React, {Component} from 'react'
export function Button (props) {
  return (
    <button onClick={props.onClickCallback}>{props.children}</button>
  )
}