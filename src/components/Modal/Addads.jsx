import { useState } from "react";
import {
  useAddProductMutation,
  useAddProductTextMutation,
} from "../../redux/Api/Api";
import * as S from "./ads.style";

function Addasd({ setNewAdver }) {
  const [adsTitle, setAdsTitle] = useState();
  const [adsDescript, setAdsDescript] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState([]);

  const [produckt] = useAddProductMutation();
  const [producktText] = useAddProductTextMutation();

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setImg((prevItems) => [...prevItems, selectedFile]);
  };

  const formData = new FormData();
  img.forEach((image, index) => {
    formData.append(`image${index + 1}`, image);
  console.log(formData);

  });
  console.log(img);
  const handleUpload = () => {
    const formData = new FormData(); 
    img.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    const payload = {
      title: adsTitle,
      description: adsDescript,
      price: price,
      files: formData,
    };

    if (img.length === 0) {
      console.log('TEXT AD');
      producktText(payload);
    }

    produckt(payload);
    setNewAdver(false);
  };

  return (
    <S.ModalBlock>
      <S.ModalContent>
        <S.ModalTitle>Новое объявление</S.ModalTitle>
        <S.BtnCloseDiv>
          <S.btnCloseLine onClick={() => setNewAdver(false)} />
        </S.BtnCloseDiv>
        <S.FormNewArt>
          <S.FormBlock>
            <S.Label htmlFor="name">Название</S.Label>
            <S.FormInput
              type="text"
              name="name"
              id="formName"
              placeholder="Введите название"
              onChange={(e) => setAdsTitle(e.target.value)}
            />
          </S.FormBlock>
          <S.FormBlock>
            <S.Label htmlFor="text">Описание</S.Label>
            <S.FormArea
              name="text"
              id="formArea"
              cols="auto"
              rows="10"
              placeholder="Введите описание"
              onChange={(e) => setAdsDescript(e.target.value)}
            ></S.FormArea>
          </S.FormBlock>
          <S.FormBlock>
            <S.FormNewArtP>
              Фотографии товара<span>не более 5 фотографий</span>
            </S.FormNewArtP>
            <S.BarImg>
              <S.BlockImg
                onClick={() => document.querySelector(".foto1").click()}
              >
                <S.InputDoc
                  className="foto1"
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFile}
                  hidden
                />
                <S.Img src={img} alt="foto" />
                <S.ImgCoverLine />
              </S.BlockImg>
              <S.BlockImg
                onClick={() => document.querySelector(".foto2").click()}
              >
                <S.InputDoc
                  className="foto2"
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/*"
                  onChange={handleFile}
                  hidden
                />
                <S.Img src="" alt="foto" />
                <S.ImgCoverLine />
              </S.BlockImg>
              <S.BlockImg
                onClick={() => document.querySelector(".foto3").click()}
              >
                <S.InputDoc
                  className="foto3"
                  type="file"
                  id="foto"
                  onChange={handleFile}
                  name="foto"
                  accept="image/*"
                  hidden
                />
                <S.ImgCoverLine />
                <S.Img src="" alt="foto" />
              </S.BlockImg>
              <S.BlockImg
                onClick={() => document.querySelector(".foto4").click()}
              >
                <S.InputDoc
                  className="foto4"
                  type="file"
                  id="foto"
                  name="foto"
                  onChange={handleFile}
                  accept="image/*"
                  hidden
                />
                <S.ImgCoverLine />
                <S.Img src="" alt="foto" />
              </S.BlockImg>
              <S.BlockImg
                onClick={() => document.querySelector(".foto5").click()}
              >
                <S.InputDoc
                  className="foto5"
                  type="file"
                  id="foto"
                  onChange={handleFile} 
                  name="foto"
                  accept="image/*"
                  hidden
                />
                <S.ImgCoverLine />
                <S.Img src="../../img/pic5.png" alt="foto" />
              </S.BlockImg>
            </S.BarImg>
          </S.FormBlock>
          <S.BlockPrice>
            <S.Label htmlFor="price">Цена</S.Label>
            <S.InputPrice
              type="text"
              name="price"
              id="formName"
              onChange={(e) => setPrice(e.target.value)}
            />
            <S.InputPriceCover />
          </S.BlockPrice>

          <S.BtnPub id="btnPublish" onClick={handleUpload}>
            Опубликовать
          </S.BtnPub>
        </S.FormNewArt>
      </S.ModalContent>
    </S.ModalBlock>
  );
}

export default Addasd;
