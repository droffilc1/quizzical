import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Choice from './Choice'


function Quiz(props) {
  const [options, setOptions] = useState(allOption())

  function generateOption(val) {
    return {
      id: nanoid(),
      value: val,
      isSelected: false,
      isTrue: false
    }
  }
  
  function allOption() {
    let Options = []
    Options.push(generateOption(props.cans))
    Options.push(generateOption(props.ians[0]))
    Options.push(generateOption(props.ians[1]))
    Options.push(generateOption(props.ians[2]))
    Options[0].isTrue = true
    return Options.sort(() => Math.random() - 0.5)
  }
  
  function toggle(id) {
    setOptions(prevOption => {
      return prevOption.map((option) => {
        return !props.click ?
        option.id === id ? option.isTrue ? {...option, isSelected: !option.isSelected, sco: 1-option.sco} :
        {...option, isSelected: !option.isSelected}
        :
        {...option, isSelected: false, sco: 0}
        :option
      })
    })
  }

  const optionEl = options.map(optn => {
    return (
      <Choice 
        key = {optn.id}
        value = {optn.value}
        isTrue = {optn.isTrue}
        isClicked = {props.click}
        isSelected = {optn.isSelected}
        Select = {() => toggle(optn.id)}
        score = {props.score}
        setScore = {props.setScore}
      />
    )
  })

  return (
    <main className='questions'>
      <h2 className='question'><span dangerouslySetInnerHTML={{__html: props.title}} /></h2>
      {optionEl}
      <div className='line'></div>
    </main>
  )
}

export default Quiz
