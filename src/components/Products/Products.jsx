import { useNavigate } from "react-router-dom";
import foto from "../../img/NoFoto.png"; 
import * as S from "./products.style";

function Products({ posts }) {
  const navigate = useNavigate();
  const HOST = "http://127.0.0.1:8090/";

  const handleProd = (prod) => {
    navigate(`/article/${prod.id}`, { replace: true });
  };

  return (
    <S.MainContent>
      <S.Cards>
        {posts.map((prod) => (
          <S.CardsItem key={prod.id} onClick={() => handleProd(prod)}>
            <S.CardsCard>
              <S.CardImage>
                <S.Img
                  src={
                    prod.images.length === 0
                      ?  foto 
                      : HOST + prod.images[0].url
                  }
                  // src={foto}
                  alt="picture"
                />
              </S.CardImage>
              <S.CardContent>
                <S.CardTitle>{prod.title}</S.CardTitle>
                <S.CardPrice>{prod.price} ₽</S.CardPrice>
                <S.CardPlace>{prod.user.city}</S.CardPlace>
                <S.CardDate>{prod.created_on.substr(0, 10)}</S.CardDate>
              </S.CardContent>
            </S.CardsCard>
          </S.CardsItem>
        ))}
      </S.Cards>
    </S.MainContent>
  ); 
}

export default Products;
