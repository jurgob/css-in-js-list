import React, { Component } from 'react';
import {Table} from 'reactable';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-93494363-1');
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// import Logo from './Logo';
// import './App.css';
var limit = require("simple-rate-limiter");


function funcFactory(func, to=2, per=1000){
  var _f = (resolve, fail, ...args) => {
    return func(...args)
      .then(res =>resolve(res))
      .catch(err => fail(err))
  }
  var resolvePromise = limit(_f).to(to).per(per);
  return (...args) => {
    return new Promise((resolve, fail) => {
        resolvePromise(resolve, fail, ...args)
    })

  }
}

var _fetch = funcFactory(fetch, 2, 1000)


window._fetch = _fetch

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


const getRepoInfo = (repo) => _fetch(`https://api.github.com/repos/${repo}`)
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
    logPageView()
    // const repo = 'styled-components/styled-components'
      const {reposTitles} = this.state;
      const reposInfo = localStorage.getItem('reposInfo')

      if(reposInfo)
        this.setState({
          reposInfo:JSON.parse(reposInfo)
        })

      const fetchRepos = true

      if(fetchRepos)
        reposTitles
          .forEach(repo => {
            getRepoInfo(repo)
              .then(repo => {
                const {reposInfo} = this.state;
                const {full_name} = repo
                const newReposInfo = {
                  ...reposInfo,
                  [full_name]: repo
                }
                this.setState({
                  reposInfo:newReposInfo
                })
                localStorage.setItem('reposInfo', JSON.stringify(reposInfo))
            })
          })


  }

  render() {

    const tableData = Object.values(this.state.reposInfo)
      .filter(repo => !!repo.name)
      .sort((a,b) => {
        return  b.stargazers_count - a.stargazers_count
      })
      .map(repo => ({
        Avatar: <img height="40px" src={repo.owner && repo.owner.avatar_url} role="presentation" />,
        Name: <a href={repo.html_url}>{repo.name}</a>,
        Stars: repo.stargazers_count,
        Issues: repo.open_issues
      }))

    return (
      <div className="App">
        <div className="App-header">
          <h2>List of React Css Library</h2>
        </div>
        <div>
            Based on <a href="https://github.com/MicheleBertoli/css-in-js">Michele Bertoli css-in-js list</a>
        </div>
        <div className="App-intro">
          <Table
            sortable={['Stars', 'Issues']}
            data={tableData}
          />
        </div>
      </div>
    );
  }
}

export default App;
