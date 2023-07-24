import * as S from "./search.style";
import logo from "../../img/logo.png";


function Search({  setValueSearch, valueSearch }) {
  return (
    <S.MainSearch>
      <S.SearchLogoLink href="#">
        <S.SearchLogoImg src={logo} alt="logo" />
      </S.SearchLogoLink>
      <S.SearchForm>
        <S.SearchInput
          value={valueSearch}
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
          onChange={(e) => setValueSearch(e.target.value)}
        />
        <S.SearchBtn>Найти</S.SearchBtn>
      </S.SearchForm>
    </S.MainSearch>
  );
}

export default Search;
