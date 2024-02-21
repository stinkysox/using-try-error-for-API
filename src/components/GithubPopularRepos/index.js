import React, {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithutPopularRepos extends Component {
  state = {
    languagesData: [],
    activeId: languageFiltersData[0].id,
    isLoading: true,
    requestFailed: false,
  }

  componentDidMount() {
    this.fetchLanguesDetails()
  }

  onSuccessfullFetch = data => {
    const {popular_repos} = data
    const updatedData = popular_repos.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      avatarUrl: eachItem.avatar_url,
      starsCount: eachItem.stars_count,
      forksCount: eachItem.forks_count,
    }))

    this.setState({languagesData: updatedData, isLoading: false})
  }

  onFailedRequest = () => {
    this.setState({requestFailed: true, isLoading: false})
  }

  onChangeTabId = id => {
    this.setState({activeId: id}, this.fetchLanguesDetails)
  }

  fetchLanguesDetails = async () => {
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    try {
      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()
        this.onSuccessfullFetch(data)
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.onFailedRequest()
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {languagesData, isLoading, activeId, requestFailed} = this.state
    return (
      <div className="repo-bg-container">
        <div className="repo-contianer">
          <h1 className="main-heading">Popular</h1>
          <div className="options-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                details={eachItem}
                onChangeTabId={this.onChangeTabId}
                isButtonClicked={activeId === eachItem.id}
              />
            ))}
          </div>
          {requestFailed ? (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
                className="failed-image"
              />
            </div>
          ) : (
            <ul className="cards-container">
              {isLoading
                ? this.renderLoader()
                : languagesData.map(eachItem => (
                    <RepositoryItem key={eachItem.id} details={eachItem} />
                  ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default GithutPopularRepos
