import appConfig from '../config.json'

function GlobalStyles () {
  return  (
    <>
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}
    </style>
    </>
  )
}

function HomePage() {
  return (  

    <div>
      <GlobalStyles/>
      <h1>
        Boas Vindas de Volta! luander
      </h1>
      <h2>
        Boas Vindas de Volta!
      </h2>
    </div>
  );
}

export default HomePage;
