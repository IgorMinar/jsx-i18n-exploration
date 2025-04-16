import '@angular/localize/init';
import './App.css';

import { useState } from 'react';


declare module 'react' {
  interface HTMLAttributes<T> {
    'i18n'?: string | boolean | undefined;
    'i18n-attr-title'?: string | boolean | undefined;
  }
}
declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "i18n": { meaning?: string; description?: string; id?: string, children: unknown };
    }
  }
}


function App() {
  

  // TODO: plural/select support
  // https://v17.angular.io/guide/i18n-common-prepare#icu-expressions
  // https://unicode-org.github.io/icu/userguide/format_parse/messages/#messageformat

  function Greeting({ name, children }: {name: string, children?: any}) {
    return <i>Hello {name}!{children}</i>;
  }

  function highlight(strings: string[], ...values: unknown[]) {
    const interpolated = strings.map((string, i) => {
      return `${string}${values[i] || ''}`;
    });
    return 'cool';
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


      <img title="a puppy pic" i18n-attr-title src="https://placehold.co/50x50/png" />


      <div i18n>
        This is a pic of my dog:
        <img alt="dog pic" i18n-attr-alt src="https://placehold.co/50x50/png"/>
      </div>
    </>
  );
}

export default App;
