import React from "react"
import { Redirect, Location } from "@reach/router" // highlight-line


const IndexPage = (location) => {
  const url = `${location.location.pathname}/about`
  return <Redirect noThrow to={url} />
}

export default IndexPage
