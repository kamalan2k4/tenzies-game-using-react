import React from "react"

export default function Die(props){
    const styles = {
        backgroundColor: props.isClicked ? '#d64883' : "white",
        color: props.isClicked ? 'white' : 'black'
    }
    return(
        <>
        <div className="die-face" onClick={props.clickDice} style = {styles}>
                    <h2 className="die-number">{props.number}</h2>
        </div>
        </>
    )
}
