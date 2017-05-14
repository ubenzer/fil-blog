import {authorMiniBio, authorName} from '../../config'
import {MainContainer} from './components/MainContainer'
import React from 'react'
import {urlForStaticAsset} from '../../app/utils/url'

const template = () =>
  <MainContainer bigHeader fullWidth>
    <div className="card introduction-card main-container__items">
      <div className="introduction-card__about_container">
        <img
          alt={authorName}
          className="introduction-card__image round-img"
          src={urlForStaticAsset({id: 'static@/img/profile-2.jpg'})}
        />
        <h1 className="introduction-card__name">{authorName}</h1>
        <h2 className="introduction-card__mini-bio">{authorMiniBio}</h2>
      </div>
      <div className="introduction-card__profile_container">
        <section className="introduction-card__bio">
          <p>Merhaba! Ben Umut. Berlin'de yaşayan bir mühendisim.</p>
          <p>Şu an HERE'da çalışıyorum. İnsanları gitmek istedikleri yere ulaştırıyoruz.</p>
          <p>Deneyimlerimi ve öğrendiklerimi paylaşmayı severim! <b>2007</b>'de ilk yazımı yazdığım kişisel
            blogum UBenzer.com Türkiye'nin en eski bloglarındandır.</p>
          <p>Hobi amaçlı olarak açık kaynak projeler yazıyorum. Bu blogun alt
            yapısında kullanılan fil de bunlardan biri. İsterseniz fil ile siz de kendi blogunuzu
            oluşturabilirsiniz.
          </p>
          <p>Danışmaktan, araştırmaktan ve alışılmış dışında çözümler denemekten çekinmem. Çıkardığım
            işin kalitesine güvenirim.
          </p>
          <p>
            <strong>Kullanıcı deneyimi</strong> ilgimi çeken alanlardandır. Arayüzün kullanıcı ile arkada çalışan
            sistem arasında bir köprü olduğuna inanırım. Kullanıcıyı anlamanın önemine inanırım.
            A/B testin gücünü bilirim.
          </p>
          <p>Bir başka hobim de bilgisayar oyununlarıdır. Bu blogda çeşitli oyunlar hakkında birçok yazı mevcut!</p>
          <p>Gezmeyi ve yeni ülkeler görmeyi severim. Şu ana kadar 10 ülke gezme fırsatım oldu, ve dahası da olacak!</p>
          <p>Benimle Facebook'tan veya umut [et] benzer [nokta] me adresinden iletişime geçebilirsiniz.</p>
        </section>
      </div>
    </div>
  </MainContainer>

export default template
