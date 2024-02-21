import './index.css'

const LanguageFilterItem = props => {
  const {details, onChangeTabId, isButtonClicked} = props
  const {id, language} = details

  const btnClass = isButtonClicked ? 'add-styles' : ''
  const onTabChange = () => {
    onChangeTabId(id)
  }
  return (
    <>
      <button
        type="button"
        className={`select-btn ${btnClass}`}
        onClick={onTabChange}
      >
        {language}
      </button>
    </>
  )
}

export default LanguageFilterItem
