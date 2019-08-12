import ReactDOM from 'react-dom'

(async function() {
  const Root = await import('./' + PROJECT_TYPE + '/' + PROJECT_NAME)
  ReactDOM.render(Root.default, document.getElementById('root'))
}())
