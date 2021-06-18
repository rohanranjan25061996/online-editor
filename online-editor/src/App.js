import {Editor} from "./Components/Editor"
import React from "react"
import {useLocalStorage} from "./hooks/useLocalStorage"

function App() {

  // using custom hook "useLocalStorage" for persisting the data
  const [html, setHTML] = useLocalStorage("html","")
  const [css, setCSS] = useLocalStorage("css", "")
  const [javascript, setJavaScript] = useLocalStorage("js", "")
  const [srcDOC, setsrcDOC] = React.useState("")

  React.useEffect(() => {
    const timeout = setTimeout(() => {  // using setTimeout because of delaying the output
      setsrcDOC( `
      <html>
      <body> ${html} </body>
      <style> ${css} </style>
      <script> ${javascript} </script>
      </html>
      ` )
    }, 250)

    return () => clearTimeout(timeout) // every time when html, css, javascript statechange its create new timeout, clear the previous one.
  }, [html, css, javascript])

  return (
    <div className="App">
      <div className="pane top-pane">
        <Editor 
        language = "xml" 
        displayName = "HTML" 
        value = {html} 
        onChange = {setHTML}/>
         <Editor 
        language = "css" 
        displayName = "CSS" 
        value = {css} 
        onChange = {setCSS}/>
         <Editor 
        language = "javascript" 
        displayName = "JS" 
        value = {javascript} 
        onChange = {setJavaScript}/>
      </div>
      <div className="pane">
        <iframe
        srcDoc = {srcDOC}
        title="output"
        sandbox="allow-scripts"
        frameborder="0"
        width="100%"
        height="100%"
         />
      </div>
    </div>
  );
}

export default App;
