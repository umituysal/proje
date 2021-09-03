import React, { useEffect, useState } from "react";
import User from "./component/User";

const App = () => {
 // useState() ilk çağırıldığında değişkene varsayılan değeri verir. 
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("umituysal");
  //useEffect() metodu, React Class LifeCycle metotlarından componentDidMount(), componentDidUpdate() ve componentWillUnmount() metotlarının kombinasyonudur. Her render’da tekrar çağırılır.
  useEffect(() => {
    getUser();
    getRepos();
  }, [query]);

  const getUser = async () => {
    const response = await fetch(`https://api.github.com/users/${query}`);
    const data = await response.json();

    setUser(data);
  };

  const getRepos = async () => {
//ilgili user bilgisinin repo bilgileri
    const response = await fetch(`https://api.github.com/users/${query}/repos`);
    const data = await response.json();
    //ilgili user bilgisi
    const response2 = await fetch(`https://api.github.com/users/${query}`);
    const data2 = await response2.json();

    function find(data, key) {
   //data verilerinin key değerlerinin kontrolünü ve aynı olanların sayısını bulmak için boş bir array tanımlandı.
      let arr2 = [];
// data verileri döngüye alıyoruz
      data.forEach((x) => {
        //arr2 objenin içinde ilgili key  kontrolü yapılıyor.  
        if (arr2.some((val) => { return val[key] == x[key];})) {
          //Eğer ilgili key değeri var ise count değeri 1 arttırılıyor
          arr2.forEach((k) => {
            if (k[key] === x[key]) {
              k["count"]++;
              //yüzdelik değeri bulunuyor
              k["percent"] = Math.round((k.count * 100) / data2.public_repos);
            }
          });
        } else {
          //Eğer key değeri yok ise yeni bir obje oluşturuluyor ve ardından count değeri 1 atanıyor.
          let a = {};
          a[key] = x[key];
          a["count"] = 1;
          a["percent"] = Math.round((a.count * 100) / data2.public_repos);
          //arr2 a objesi ekleniyor.
          arr2.push(a);
        }
      });
      return arr2;
    }
    //key değeri language olarak seçildi.
    let key = "language";
    setRepos(find(data, key));
  };
//input alanında değerin güncellenmesi sağlandı.
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  //form submit edildiğinde datanın gelmesi
  const getSearch = (e) => {
    e.preventDefault(); 
    setQuery(search);
    setSearch(""); 
  };

  return (
  
    <div className="App">
      <form onSubmit={getSearch} className="search__form">
        <input
          className="search__bar"
          placeholder="Type Github username in here.."
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search__button" type="submit">
          Analyze
        </button>
      </form>
      <div className="user">
        <User
          key={user.id}
          name={user.name}
          email={user.email}
          image={user.avatar_url}
          public_repos={user.public_repos}
          repos={repos}
          percent={repos.percent}
        />
      </div>
    </div>
  );
};

export default App;
