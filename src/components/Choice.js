import React from 'react'
function Choice(props) {
  const styles = {
    backgroundColor: props.isTrue ?
                      '#94D7A2':
                    props.isSelected ? '#F8BCBC' : 'none',
    color: !props.isTrue && '#9aa1c9',
    border: '2px solid #9da4c8' ,
    border: props.isTrue && 'none' && props.isSelected && 'none'
  }

  const style1 = {
    backgroundColor: props.isSelected ? '#D6DBF5' : 'none',
    cursor: 'pointer'
  }

  function handleSelect() {
    props.Select()
    if(props.isTrue) {
      props.setScore(props.score + 1)
    }
  }

  return (
    <div className='box'
      style={props.isClicked ? styles: style1} 
      onClick={handleSelect}>
      <span dangerouslySetInnerHTML={{__html: props.value}}/>
      </div>
  )
}

export default Choice
