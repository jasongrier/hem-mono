import ReactDOM from 'react-dom'

(async function() {
  const Root = await import('./' + window.env.PROJECT_TYPE + '/' + window.env.PROJECT_NAME)
  ReactDOM.render(Root.default, document.getElementById('root'))
}())
