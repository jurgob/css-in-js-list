import React, { Component } from 'react';
// import Logo from './Logo';
// import './App.css';

/*
get this list from Michele Bertoli css-in-js page:
https://github.com/MicheleBertoli/css-in-js
with:
Array.prototype.map.call(document.querySelectorAll('#readme table tbody a'), (a) => a.href.replace('https://github.com/', '')  ).map(e => `"${e}"` ).join(",\n")
*/

const REPOS_TITLES = [
  "Khan/aphrodite",
  "martinandert/babel-plugin-css-in-js",
  "bloodyowl/react-styled",
  "inturn/classy",
  "rtsao/csjs",
  "siddharthkp/css-constructor",
  "webpack/css-loader",
  "jareware/css-ns",
  "cssobj/cssobj",
  "krasimir/cssx",
  "jacobp100/es-css-modules",
  "threepointone/glamor",
  "colingourlay/hyperstyles",
  "j2css/j2c",
  "petehunt/jsxstyle",
  "FormidableLabs/radium",
  "jhudson8/react-css-builder",
  "andreypopp/react-css-components",
  "gajus/react-css-modules",
  "jxnblk/react-cxs",
  "rofrischmann/fela",
  "blakeembrey/react-free-style",
  "RickWong/react-inline-css",
  "dowjones/react-inline-style",
  "martinandert/react-inline",
  "jsstyles/react-jss",
  "rofrischmann/react-look",
  "necolas/react-native-web",
  "elierotenberg/react-statics-styles",
  "nick/react-styl",
  "js-next/react-style",
  "pluralsight/react-styleable",
  "rtsao/react-stylematic",
  "azazdeaz/react-theme",
  "fdecampredon/react-vstyle",
  "casesandberg/reactcss",
  "rtsao/scope-styles",
  "hackhat/smart-css",
  "bloodyowl/stile",
  "bloodyowl/react-media-queries",
  "kodyl/stilr",
  "buildbreakdo/style-it",
  "styled-components/styled-components",
  "zeit/styled-jsx",
  "rtsao/styletron",
  "andreypopp/styling",
  "typestyle/typestyle",
  "tuckerconnelly/uranium"
]


const getRepoInfo = (repo) => fetch(`https://api.github.com/repos/${repo}`)
  .then((res) => res.json() )

class App extends Component {

  constructor(){
    super()
    this.state = {
      reposTitles:REPOS_TITLES,
      reposInfo:{},
      reposResponse:[]
    }

    // https://api.github.com/repos/
  }

  componentDidMount(){
    // const repo = 'styled-components/styled-components'
      const {reposTitles} = this.state;
      Promise
        .all(reposTitles.map(repo => getRepoInfo(repo)))
        .then(repos => {
          this.setState({
            reposResponse:repos
          })
          // repos.map((res) => this.setState({
          //     reposInfo:{
          //       ...reposInfo,
          //       [res.full_name]:res
          //     }
          //   }))
        })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <Logo /> */}
          <h2>List of React Css Library</h2>
        </div>
        <div>
            Based from the <a href="https://github.com/MicheleBertoli/css-in-js">Michele Bertoli css-in-js list</a>
        </div>
        <div className="App-intro">
          <table style={{borderSpacing:"15px"}}  >
            <thead style={{textAlign:"left"}} >
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reposResponse
                .sort((a,b) => {
                  console.log('sort', a.stargazers_count < b.stargazers_count)
                  return  b.stargazers_count - a.stargazers_count
                })
                .map(repo => <Repo key={repo.full_name}  repo={repo} />   )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const Repo = ({repo}) => {

  if(!repo && !repo.name)
    return (<tr><td>error</td></tr>)

  return (
    <tr>
      <td>
        <img height="40px" src={repo.owner && repo.owner.avatar_url} role="presentation" />
      </td>
      <td>
        <a href={repo.html_url}>
          {repo.name}
        </a>
      </td>
      <td>
      {repo.stargazers_count}
      </td>
    </tr>
  )

}
export default App;
