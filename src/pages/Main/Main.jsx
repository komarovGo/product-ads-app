import { useEffect, useState } from "react";

import { useGetAllProductsQuery } from "../../redux/Api/Api";

import Products from "../../components/Products/Products";
import Search from "../../components/Search/Search";
import HeaderMain from "../../components/Header/HeaderMain";
import * as S from "./main.style";
import { useAuth } from "../../redux/Hooks/useAuth";
import HeaderAll from "../../components/Header/HederAll";

function Main() {
  const { data } = useGetAllProductsQuery();
  const { isAuth } = useAuth();
  const [valueSearch, setValueSearch] = useState("");
 
  const findPost = () => data.filter((item) => item.title.toLowerCase().includes(valueSearch));
  
  const posts = valueSearch.length > 0 ?  findPost() : data;

  return (
    <S.Wrapper>
      <S.Container>
        {isAuth ? <HeaderAll /> : <HeaderMain />}
        <S.Main>
          <Search valueSearch={valueSearch} setValueSearch={setValueSearch} />
          <S.MainContainer>
            <S.MainH2>Объявления</S.MainH2>
            {posts ? <Products posts={posts} /> : null}
          </S.MainContainer>
        </S.Main>
      </S.Container>
    </S.Wrapper>
  );
}

export default Main;
