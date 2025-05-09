import './App.css';
import { initializeJsxLocalize } from '@flarelabs-net/jsx-localize/react';
initializeJsxLocalize();

import { useState } from 'react';

const helloTopLevelJSX = <i18n>Hello world!</i18n>;
const helloTopLevelString =  $localize`Hello world!`;


function App() {
  

  // TODO: plural/select support
  // https://v17.angular.io/guide/i18n-common-prepare#icu-expressions
  // https://unicode-org.github.io/icu/userguide/format_parse/messages/#messageformat

  function Greeting({ name, children }: {name: string, children?: any}) {
    return <i>Hello {name}!{children}</i>;
  }

  const [count, setCount] = useState(0);
  function increment() {
    console.log('increment');
    setCount(count+1);
    console.log(count);
  }

  let firstName = 'George';

  const loggedIn = Math.random() > 0.5;
  const UserProfile = function () {
    return <>userprofile</>;
  };

  const puppyName = 'Jadzia';

  return (
    <>
      <div i18n>
        Hello world!
      </div>

      { /* or alternatively using pseudo <i18n element, without the <div> element wrapper */}
      <i18n>
        Hello world!
      </i18n>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" />
      */}


      <i18n>
        Hello div-less moon!
      </i18n>

      {/* compare to status quo:
      <Trans id="welcome.friendly-moon-greeting" />
      */}


      <div i18n>
        Hello {firstName}!
      </div>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" vars={{name: firstName}} />
      */}


      <div i18n>
        Click to increment: <button onClick={increment}>count={count}</button>
      </div>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" ???? />
      */}


      <div i18n>
        Hello <b><i>my friend {firstName}</i></b>!
      </div>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" vars={{name: firstName}} />
      */}


      <div i18n>
        *prefix*
        <u>
          <Greeting name={firstName}>extra</Greeting>
        </u>
        *suffix*
      </div>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" Components={[Greeting]} componentProps={[{name: firstName}]} />
      */}


      <div i18n>
        *prefix*
        <u>
          <Greeting name="self-closing"/>
        </u>
        *suffix*
      </div>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" Components={[Greeting]} componentProps={[{name: "self-closing"}]} />
      */}

      <div i18n>
        *prefix*
        <u>
          first: <Greeting name="swapped"/>
          second: <Greeting name="double"/>
        </u>
        *suffix*
      </div>

      {/* compare to status quo:
      <Trans id="welcome.friendly-greeting" Components={[Greeting, Greeting]} componentProps={[{name: "swapped"}, {name: "double"}]} />
      */}

      <div i18n>Hello {loggedIn ? <UserProfile /> : 'world'}!</div>


      <div i18n>
        Hello {loggedIn ? <span i18n>friend</span> : <span i18n>stranger</span>}
      </div>


      <img title="a puppy pic" i18n-title src="https://placehold.co/50x50/png" />


      <div i18n>
        This is a pic of my dog:
        <img alt="dog pic" i18n-alt src="https://placehold.co/50x50/png"/>
      </div>

      {helloTopLevelJSX}
      {helloTopLevelString}
    </>
  );
}

export default App;
