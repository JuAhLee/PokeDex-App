<h1> Pokemon 도감 만들기 </h1>
<br>

- **배포 링크 :**  [포켓몬 도감 링크](https://pokemonpraapp.netlify.app/)
<br><br>

 ## 페이지 설명 :
 > 포켓몬 1008개체에 대한 **정보, 능력치, 설명**을 적어놓은 포켓몬 사전 사이트 입니다.

 > 사이트는 **로그인 페이지, 메인 페이지, 포켓몬 상세 페이지**로 이뤄져 있습니다.
 
 <br>

  **로그인 페이지 :** FireBase를 이용해 Google 로그인을 할 수 있습니다.
 <br><br>
   **메인 페이지 :** 원하는 포켓몬을 검색할 수 있습니다.
   <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            : 프로필을 눌러 로그아웃을 할 수 있습니다.
            <br> 
            
   **포켓몬 상세 페이지 :** 포켓몬의 정보, 능력치, 설명을 확인할 수 있습니다.
    <br> 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    : 포켓몬 이미지를 클릭하면 포켓몬 속성에 관한 데미지 관계가 나옵니다. 

  
<br> <br>



| Login 페이지  | |
|:---:|:---:|
|<img src="./src/gif/Login_gif.gif"/>||
|Main 페이지| Pokemon Detail 페이지|
|<img width="100%" src="./src/gif/Main_Search_gif.gif"/>|<img width="100%" src="./src/gif/Pokemon_Detail_gif.gif"/>|



<br>
<br>

## 기술 스택 

| Vite | TailwindCSS | Javascript | Netlify |
| :--------: | :-: | :--: | :-----: |
| StyledComponent | PostCSS | Typescript | Firebase |


<br>
<br>

## 사용한 라이브러리 & 구현 기능
<br>

- ## 라이브러리 :

 > ## [React Router Dom](https://reactrouter.com/en/main/start/tutorial)  
  페이지 전환을 도와주는 라이브러리입니다.

```javascript
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

<BrowserRouter>
 <Routes>
   <Route path="/" element={<Layout />}>
     <Route index element={<MainPage />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/pokemon/:id" element={<DetailPage />} />
   </Route>
 </Routes>
</BrowserRouter>
```
<br>

> ## [useDebounce](https://www.npmjs.com/package/use-debounce)

 연속적인 이벤트가 발생했을 때 마지막 이벤트만 적용되게끔 해주는 Hook입니다.

```javascript
//훅 생성
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;

//사용
import useDebounce from "./hooks/useDebounce";

const debouncedSearchTerm = useDebounce(searchTerm, 500);

```
<br>

> ## [useRef](https://ko.react.dev/reference/react/useRef)
렌더링에 필요하지 않은 값을 참조할 수 있게 해주는 Hook입니다.

```javascript
import { useRef } from "react";

//DOM요소를 선택하기 위해 사용된 useref
const DamageModal = ({ setIsModalOpen, damages }: DamageModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnclickOutside(ref, () => setIsModalOpen(false));
  return()
  }

```
<br>

> ## [firebase](https://firebase.google.com/docs/web/setup?_gl=1*w7w3zt*_up*MQ..*_ga*MTQ1OTQ1MzAxMi4xNzMwNDcyMjQw*_ga_CW55HF8NVT*MTczMDQ3MjIzOS4xLjAuMTczMDQ3MjM0OS4wLjAuMA..&gclid=CjwKCAjw-JG5BhBZEiwAt7JR65G3afRtlt1UffZpers37sk5hIWFooUARUITy6ECxe1dWbqRt7C50hoCIZQQAvD_BwE&gclsrc=aw.ds&hl=ko)
>
 백엔드 부분(유저 인증, 데이터 통신 등)을 지원해주는 서비스입니다.

```javascript
//firebase로부터 인증에 관련된 기능들을 불러옴
import {
  User,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --구글 로그인 정보 가져오기--
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUserData(result.user);
        storage.set("userData", result.user);
        //localStorage.setItem("userData", JSON.stringify(result.user));
        //유저 정보를 로컬에 저장하고 싶을시 사용
      })
      .catch((error) => {
        console.error(error);
      });
  };
//--로그아웃--
    const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // localStorage.removeItem('userData');
        //로컬 유저 정보를 삭제 시 사용
        storage.remove("userData");
        setUserData(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

```

<br />
<br />



 - ## 기능 :
 > ## image lazy loading 

 불러온 이미지들을 바로 보여주는게 아니라, 화면에 보일 필요가 있을때만 로딩을 할 수 있도록 하는 테크닉입니다. <br>
 추가로 **...Loading** 이나 **이미지**를 사용하여 api에서 포켓몬 이미지 등이 아직 불러와 지지 않았음을 표기해 주었습니다. <br><br>
 다음과 같은 방법으로 **image lazy loading**를 구현할 수 있습니다.
 - JavaScript 이벤트를 이용해 구현.
 - Intersection Observer API를 이용해서 구현.
 - 브라우저 Native Lazy Loading (loading 속성)을 이용해서 구현.

 ```javascript 
 /* Native Lazy Loading 방법으로 image lazy loading을 구현했습니다.
  img 태그에 loading 속성을 추가합니다.*/

 const LazyImage = ({ url, alt }: LazyImageProps) => {
    // isLoading이 true면 로드 중. ( loading 이미지 표기 )
    const [isLoading, setisLoading] = useState<boolean>(true); 

  return (
   <>
   {
    isLoading && (
        <div>
            ...loading
        </div>
    )
   }
   <img loading='lazy'  
        onLoad={() => setisLoading(false)} />

   </>
  )
}

 ```


<br><br>

 > ## AutoComplete

 메인 페이지에서 포켓몬을 검색할 때, 검색중인 포켓몬과 관련된 이름들을 드롭다운으로 표기해 줍니다.
 ```javascript
  /* STEP1. 자동완성 될 포켓몬의 이름을 모두 갖고 있어야 하므로, 렌더링과 별개로 모든 포켓몬 데이터를 가져와 useState 변수에 저장합니다.
  검색과 관련된 api가 있다면 그 api를 가져오면 됩니다.  */

  // 모든 포켓몬 데이터
  const [allPokemons, setAllPokemons] = useState<PokemonNameAndUrl[]>([]);

  // 렌더링 되는 포켓몬 데이터
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonNameAndUrl[]>([]);

  /* STEP2 상황에 맞게 AutoComplete 기능을 완성합니다. */

   const AutoComplete = ({ allPokemons, setDisplayedPokemons }: AutoCompleteProps) => {
  
  // 검색 부분
  const [searchTerm, setSearchTerm] = useState("");

  // 조건1. 검색한 단어를 모두 소문자로 바꿔주고 filter를 통해 allPokemon에서 검색단어가 포함된 Pokemon들을 불러오기.
  const filterNames = (input: string) => {
    const value = input.toLowerCase();
    return value ? allPokemons.filter((e) => e.name.includes(value)) : [];
  };

  // 조건2. 검색버튼을 누르면 검색기능 가동, 검색 부분 초기화.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    let text = searchTerm.trim();
    setDisplayedPokemons(filterNames(text));
    setSearchTerm("");      
  };

 // 조건3. 검색한 것과 정확히 일치하는 포켓몬이 없다면 autocomplete 없애기.
  const checkEqualName = (input: string) => {
    const filteredArray = filterNames(input);

    return filteredArray[0]?.name === input ? [] : filteredArray;
  };

  return ( 
    ...
  )
}

 ```
 <br><br>

 > ## Pokemon Damage Relationship Modal
 포켓몬 상세 페이지에서 내가 클릭한 포켓몬 속성의 데미지 관계를 Modal로 불러옵니다.
<br>


```javascript
// 모달 오픈 여부 useState 생성.
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

// 모달 open 조건 생성.
 <img ... 
   onClick={() => setIsModalOpen(true)}
  />

// 모달 close 조건 생성.
// X 버튼을 눌렀을 때
<span
  onClick={() => setIsModalOpen(false)}
  className=""
  >
  X
  </span>

// 모달 외 배경을 눌렀을 때 (useRef)
 const ref = useRef<HTMLDivElement>(null);
 <div ref={ref}> </div>  // 모달 바깥쪽 div에 ref 속성 부여.

```


 <br><br>

 > ## [Quick Type](https://app.quicktype.io/) 
 JavaScript Object에서 Key의 Type을 자동으로 생성해주는 사이트 입니다. <br>
 JSON 데이터를 기반으로 Type을 지정하기 때문에 사이트에 JSON 파일로 제공해야 합니다. <br><br>

```javascript
 function formatPokemonData(params: PokemonDetail) {
  console.log("Quick Type에 넣을 JSON 파일 만들기", JSON.stringfy(params))  
    const { id, types, name } = params;
    const PokeData: PokeData = {
      id,
      name,
      type: types[0].type.name, 
    };

    return PokeData;
  }

  // 결과는 PokeDex-App/src/types/PokemonDetail.ts 파일.
```
<br><br>

 > ## [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped?tab=readme-ov-file)

정의된 타입을 사용할 수 있도록 도움을 주는 기능입니다.

```javascript
// uuid에 대한 타입을 받기 위해 사용
npm install --save-dev @types/uuid
```


