import {Component} from 'react'
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {id, avatarUrl, forksCount, issuesCount, name, starsCount} = details

  return (
    <li className="card">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="card-heading">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="rating-img"
        />
        <p className="card-para">{starsCount}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="rating-img"
        />
        <p className="card-para">{forksCount}</p>
      </div>

      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="rating-img"
        />
        <p className="card-para">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
