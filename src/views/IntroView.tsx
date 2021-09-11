import React from 'react'
import styled from 'styled-components'
import ModernGrotesqueTimes from '@/assets/img/modern-grotesque-times.png'
import identityFontDesc from '@/assets/img/identity-font-desc.png'
import foundation from '@/assets/img/foundation.jpg'
import OrcaBooks from '@/assets/img/orca-books.png'

const IntroView: React.FC = () => {

  return (
    <MGTIntroView>
      <div className="intro-wrapper">
        <div>
          <section>
            <p className="header">[모던 그로테스크 타임스 프로젝트 MODERN GROTESQUE TIMES PROJECT]</p>
            <p className="header">#프로젝트 소개</p>
            <p>
              안녕하세요, 저희는 콜렉티브 칼리고라이트(Caligolite)입니다. 칼리고라이트는 한국과 미국을 기반으로 소설을 쓰고 번역을 하는 한아임과 전시를 만들고 글을 쓰는 이혜원, 프랑스 철학을
              전공한
              웹개발자 이민경이 협업하여 동시대의 미술과 문학, 픽션과 논픽션의 교차지점, 온라인과 오프라인 매체의 확장 가능성을 탐구하는 연구 모임입니다.</p>
            <p>칼리고라이트의 관심대상은 <strong>‘그로테스크(grotesque)’</strong>라는 개념입니다. ‘그로테스크’란 아직 학술적으로 논쟁적인 광의의
              개념어이지만, 일반적으로는 ‘괴기한 것, 극도로 부자연한 것, 흉측하고
              우스꽝스러운 것’ 등을 형용하는 말로 쓰입니다. 우리는 구체적으로 동시대의 사회와 문화에서 나타나는 ‘그로테스크한 것The grotesque’ 전반에 관심이 많습니다. 그래서 <strong>〈모던
                그로테스크
                타임스〉 프로젝트를 통해 오늘날 ‘지금, 여기’의 ‘그로테스크한 것’들을 사유하고, 탐구하여, 사람들과 공유해 보고자 합니다.</strong>
            </p>
          </section>
          <section>
            <p className="header">#프로젝트 멤버 소개</p>
            <p className="header">● 한아임</p>
            <p>한아임은 아무 데에도 아무 때에도 있었던 적 없는 세상, 그리고 언제나 어디에나 존재하는 세상 사이의 해석자다. 원래도 괴란하고 괴이하고 괴상하며 해석함 직하다고 여기는 것도 여러모로
              괴하다.
              이런
              성향은 번역으로 나타날 때도 있고, 오리지널 스토리텔링으로 나타날 때도 있다. 이러나저러나 결과적으로는 어떤 형태로든 이야기를 하고 있다. 뭐 하고 사나, 뭘 쓰고 뭘 번역했나 궁금하면
              여기로.
              <a href="https://imdkdla.com" target="_blank" rel="noreferrer">(https://imdkdla.com)</a></p>
            <p className="header">● 이민경</p>
            <p>모던 그로테스크 타임스의 웹사이트를 개발한 이민경은 개발을 하기 전에는 서울대학교 미학과에서 프랑스 현대 철학가들의 미학 사상을 공부했으며 예술작품의 의미가 생성되는 기제에 대한 논문
              「Writing
              as <em>Mise-en-Scène:</em> Derrida, Signification, and the Work of Art: 미장센으로서의 글쓰기: 데리다, 의미작용, 그리고
              예술작품」으로
              석사학위를 받았다.
              아름답다는 감정은 왜 어떻게 생겨나는지 항상 궁금하다. 개 버릇 남주지 못해서인지 못생긴 UI만은 두고 볼 수 없어 주로 사용자 인터페이스를 만드는 프론트 엔드 개발을 도맡아 한다. 기능
              개발과
              디버깅을 끝내고 나서 아무도 알아차리지 못하는 UI를 한 땀 한 땀 고치며 희열을 느낀다.</p>
            <p className="header">● 이혜원</p>
            <p>이혜원은 현재 미술관에서 전시를 만들고 글을 쓰는 일을 한다. 《모던 그로테스크 타임스》(2021, space xx)의 기획자이며 범고래출판사를 운영한다. 미술관에 오기 전에는 동시대
              미술에서
              ‘장소
              특정성’ 개념의 가능성을 살펴보는 연구로 서울대학교 미학과에서 석사학위를 받았으며, 한국국제협력단 본부 및 탄자니아 주재원 사무소에서 공적개발원조 업무를 지원했다. 동시대 한국의 시각 문화
              전반에
              관심이 많다. 최근 참여한 전시로는 《호민과 재환》(2021, 서울시립미술관), 《컬렉션_오픈 해킹 채굴》(2021, 서울시립미술관), 《호랑이는 살아있다》(2020, 코리아나미술관) 등이
              있다.</p>
          </section>
          <section>
            <p className="header">#프로젝트구조</p>
            <p className="header">1) [공동 연구] 번역서 출판(12월 말 출간 예정)</p>
            <p>프로젝트의 개념적 토대가 되는 작업으로서, 시각문화 영역에서 다양하게 나타나는 ‘괴물성Monstrosity’을 탐구하는 연구서 번역 출판.</p><br/>
            <p className="header">2) [개별 연구] 온라인 정기간행물(웹진/뉴스레터) 발행(9월 - 12월)</p>
            <p>2021년 9월부터 12월까지 홈페이지에 매달 온라인 콘텐츠 업로드.</p>
            <p>한아임: 메갈로폴리스 서울을 배경으로 펼쳐지는 본격 슈퍼내추럴 판타지 소설 〈유랑 화가: 싱싱의 그놈〉 연재.</p>
            <p>이혜원: ‘일상’과 ‘그로테스크’라는 주제 아래 선정한 키워드를 동시대 시각 예술가들과 함께 탐구하고 관련 작품을 온라인에서 공개.</p><br/>
            <p className="header">3) [연구결과 시각화 및 공유] 전시 《모던 그로테스크 타임스》 개최 + 프로젝트 종합자료집 발간(12월 말)</p>
            <p>1), 2)로 수렴된 번역서, 정기간행물, 연구 아카이브 등과 함께 각 키워드를 탐구한 작가들의 작품을 전시의 형태로 종합. 이후 모든 결과물을 수록한 종합자료집 발간.</p>
          </section>
        </div>
        <div>
          <section>
            <p className="header">
              [모던 그로테스크 타임스 연재소설 〈유랑 화가: 싱싱의 그놈〉 MODERN GROTESQUE TIMES SERIAL FICTION: The Traveling Painter]
            </p>
            <p>
              보이는 것만 믿고 산 건 아니지만 보이는 대로 그리고 보여주는 삶을 살았던 초상화가 정시연.
              어느 날, 잘만 보이던 것이 보이지 않게 되고 만다. 심지어 들리지 않아야 할 것이 들리게 되는데.
            </p>
            <p>나름 실용적이면서도 이상적이라고 여겼던 삶에 설명할 수 없는 일이 벌어지는 가운데, 시연은 적응하고 흥하고, 심지어 존재하는 줄도 몰랐던 나쁜 녀석들과의 싸움에서 승할 수 있을까?</p>
            <p>*시즌제로 연재되는 유랑 화가, 그 첫 번째 시즌.</p>
            <p>
              {`- 9월 1일: 1화
              - 9월 11일: 2화
              - 9월 21일: 3화
              - 10월 1일: 4화
              - 10월 11일: 5화
              - 10월 21일: 6화
              - 11월 1일: 7화
              - 11월 11일: 8화
              - 11월 21일: 9화
              - 12월 1일: 10화
              - 12월 11일: 11화 (시즌 1 완결)`}
            </p>
          </section>
        </div>
        <div>
          <section>
            <p className="header">[모던 그로테스크 타임스 전시(온/오프라인) MODERN GROTESQUE TIMES EXHIBITION(ON/OFF-LINE)]</p>
            <p>- 전시 제목: 모던 그로테스크 타임스 MODERN GROTESQUE TIMES</p>
            <p>- 전시 기간: 2021년 12월 18일(토) – 12월 31일(금), 12시-20시(매주 월요일 휴관)</p>
            <p>- 전시 장소: space xx(서울 영등포구 문래동 도림로 128 지하 1층)</p>
            <p>- 기획: 이혜원</p>
            <p>- 후원: 서울문화재단</p>
            <p>- 협력: 범고래출판사(<a href="http://orcabooks.co.kr" target="_blank" rel="noreferrer">http://orcabooks.co.kr</a>)
            </p>
            <p className="artists">
              - 참여 작가: NA MIRA(DYLAN MIRA/<a href="http://www.na-mira.com" target="_blank"
                                             rel="noreferrer">http://www.na-mira.com</a>)<br/>
              오선영(SUN OH/<a href="http://www.sunyoh.com" target="_blank"
                            rel="noreferrer">http://www.sunyoh.com</a>)<br/>
              빡도(Pakdo/<a href="https://www.instagram.com/graphic.pakdo" target="_blank"
                          rel="noreferrer">https://www.instagram.com/graphic.pakdo</a>)<br/>
              STUFF DESIGN(<a href="https://www.instagram.com/the_stuff_design" target="_blank"
                              rel="noreferrer">https://www.instagram.com/the_stuff_design</a>)
            </p>
            <p>- 전시 장르: 퍼포먼스, 영상, 설치, 아카이브 자료 등</p>
            <p>- 키워드: #일상 #그로테스크 #가족 #샤머니즘 #북한 #장소</p>
          </section>
          <section>
            <p className="header">#전시 키워드별 발표일정 및 참여작가 소개</p>
            <p>《모던 그로테스크 타임스》 전시 프로젝트에서는 ‘일상’과 ‘그로테스크’라는 대주제 아래, 네 가지 하위 키워드를 탐구한다.</p>
            <table>
              <thead>
              <tr>
                <th>연번</th>
                <th>키워드</th>
                <th>온라인 발표</th>
                <th>전시</th>
                <th>작가</th>
                <th>매체</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>샤머니즘</td>
                <td>09월 1일</td>
                <td rowSpan={4} className="exp-schedule">
                  <div>{`12.18\n(토)`}</div>
                  <div className="separator">-</div>
                  <div>{`12.31\n(금)`}</div>
                </td>
                <td>NA MIRA</td>
                <td>영상</td>
              </tr>
              <tr>
                <td>2</td>
                <td>가족</td>
                <td>10월 1일</td>
                <td>오선영</td>
                <td>퍼포먼스</td>
              </tr>
              <tr>
                <td>3</td>
                <td>북한</td>
                <td>11월 1일</td>
                <td>빡도</td>
                <td>그래픽 디자인</td>
              </tr>
              <tr>
                <td>4</td>
                <td>장소</td>
                <td>12월 1일</td>
                <td>STUFF DESIGN</td>
                <td>건축, 아카이빙</td>
              </tr>
              </tbody>
            </table>
            <br/>
            <p className="header">#1 샤머니즘(shamanism) X NA MIRA</p>
            <p className="header">● 나 미라NA MIRA(aka DYLAN MIRA)</p>
            <p>한국계 미국인인 나 미라는 로스엔젤레스에 기반하여 활동하는 시각 예술가이다. 작가는 미국의 The School of the Art Institute of Chicago에서 비디오와
              뉴미디어를
              전공했으며, University of California Los Angeles에서 새로운 장르 전공으로 석사를 받았다. 나 미라는 설치, 조각, 사진 등 다양한 매체를 활용하지만, 영상과
              설치
              작품을
              주로 선보여 왔다. 특히 작품을 통해 무속신앙, DMZ, 호랑이, 해녀 등 한국의 다양한 역사적·문화적 레퍼런스들을 탐구해 왔다. 이번 《모던 그로테스크 타임스》에서는 작가가
              ‘샤머니즘’이라는
              키워드에
              대해 관심을 발전시켜온 궤적을 보여줄 수 있는 작품들을 소개한다.</p><br/>
            <p className="header">#2 가족(family) X 오선영</p>
            <p className="header">● 오선영 Sun Oh</p>
            <p>오선영은 한국과 영국을 기반으로 활동하는 시각 예술가이다. 영국의 Goldsmiths, University of London에서 순수미술을 전공했으며, 주로 연극적인 무대장치 연출과
              퍼포먼스,
              영상
              매체를 활용하여 지극히 내밀한 개인사나 주변인들과의 관계에서 경험하는 감정의 파열을 다뤄왔다. 이러한 흐름의 연장선상에서 오선영은 《모던 그로테스크 타임스》를 통해 한국 사회에서의
              ‘가족’이라는
              존재,
              그리고 그들과 맺는 관계를 심층적으로 탐구한다.</p><br/>
            <p className="header">#3 북한(North Korea(DPRK)) X 빡도</p>
            <p className="header">● 빡도 Pakdo</p>
            <p>빡도는 서울을 기반으로 활동하는 그래픽 디자이너이자 LGBT 운동가이다. 《HIV 감염 7주년 축하 RSVP》(2021), 《비전 사인: vision sign : 比傳四人》(2021),
              《작은불화》(2020) 등 다양한 전시의 그래픽 작업에 참여해왔으며, 디자인이라는 매체를 통해 사회적 소수자들이 겪는 문제에 대해 꾸준히 발언해왔다. 《모던 그로테스크 타임스》에서 빡도는
              전시의
              그래픽
              디자인과 함께 ‘북한’ 키워드를 다룬다. 동시대 한국의 일상에서 북한은 ‘존재하지 않음으로써 그 존재의 영향력을 끼치는’ 기묘한 실체이다. 빡도는 북한이 독자적으로 개발한 운영체제(OS)인
              ‘붉은별’을 기반으로 《모던 그로테스크 타임스》의 아이덴티티 디자인 작업을 진행한다.</p><br/>
            <p className="header">#4. 장소(place) X STUFF DESIGN</p>
            <p className="header">● 스터프 디자인 STUFF DESIGN</p>
            <p>스터프 디자인은 서울을 기반으로 활동하며 홍익대학교 건축학과 졸업생들로 이루어진 디자이너 콜렉티브이다. 스터프 디자인이 관심을 두는 범위는 건축 공간에서부터 라이프스타일에 이르기까지
              다종다양하다.
              그중에서도 특히 대상의 물성을 탐구하여 새롭게 재해석 하는 실험을 거듭해왔다. 최근에는 2021 베니스비엔날레 국제건축전 한국관 《미래학교》의 &lt;Talking
              trees&gt;(2021)
              프로젝트의 멤버로
              참여한 바 있다. 《모던 그로테스크 타임스》의 ‘장소’ 키워드를 맡은 스터프 디자인은 서울에 실재하는 한 ‘특정한 장소’에 접근을 시도하면서, 현실과 판타지 사이에서 ‘장소’가 주는 기묘한
              감각들을
              작품으로 풀어낸다.</p>
          </section>
        </div>
        <div className="identity-font-desc">
          <section>
            <p className="header">[모던 그로테스크 타임스 아이덴티티 MODERN GROTESQUE TIMES IDENTITY]</p><br/>
            <div className="identity-font-desc-container">
              <img src={ModernGrotesqueTimes} alt="MODERN GROTESQUE TIMES"/>
              <img src={identityFontDesc} alt="identity font desc"/><br/>
            </div>
            <p>모던 그로테스크 타임스의 타이포그래피 아이덴티티는 ‘천리마’체로 만들어졌다. 천리마체는 북한이 자체개발한 운영체제(OS) '붉은별'의 메인 폰트로, 북한식 고딕체라고 할 수 있다. 북한의
              선전
              포스터와
              상표인쇄 등 각종 인쇄물에 두루 쓰여 ‘활자글씨체’라고도 불린다. 기술의 발달로 ‘천리마 가는체’, ‘천리마 둥근체’ 등 파생 폰트가 14종이나 개발되었을 정도로 북한 사회에서 대중적으로
              가장
              수요가
              많은 폰트이기도 하다. 천리마체는 1970년대까지 북한 〈로동신문〉의 본문과 제목글에 사용되었다고 한다.
            </p>
          </section>
        </div>
        <div className="sponsor-container">
          <img src={foundation} alt="sfac"/>
          <img src={OrcaBooks} alt="ORCA BOOKS"/>
        </div>
        <p className="copyright__ko">
          ⓒ2021 칼리고라이트<br/>
          이곳에 실린 글과 사진 및 도판에 대한 저작권은 각 저작권자에게 있으며, 저작권자와 칼리고라이트의 사전 동의 없이 무단으로 사용할 수 없습니다.
        </p><br/>
        <p className="copyright__eng">
          ⓒ2021 Caligolite<br/>
          All texts and images published in this page are subject to the copyright of each copyright holder. No part of
          this publication may be reproduced without the permission of the authors and the Caligolite.
        </p><br/>
      </div>
    </MGTIntroView>
  )
}

const MGTIntroView = styled.div`
padding: 4.7rem 0;
display: flex;
justify-content: center;
& > div {
  width: calc(100% - 12rem);
  max-width: calc(100% - 12rem);
  white-space: pre-line;
  font-size: 1.8rem;
  line-height: 160%;
  letter-spacing: -0.015rem;
  word-break: keep-all;
  & > div {
  &:not(:first-child) {
  margin-top: 13.6rem;
  }
  }
  section {
&:not(:first-child) {
  padding-top: 1.8rem;
}
    p {
  &.header {
  font-weight: bold;
}
  &.paragraph {
  text-indent: 3.6rem;
}
  &.artists {
  padding-left: 9.2rem;
  text-indent: -9.2rem;
  overflow: hidden;
  overflow-wrap: break-word;
}
}
  }
      p {
&.copyright__ko, &.copyright__eng {
text-align: center;
}
}
img {
object-fit: contain;
max-width: 100%;
}
div {
&.identity-font-desc {
.identity-font-desc-container {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
img {
&[alt="identity font desc"] {
width: 80%;
}
}
}
}
&.sponsor-container {
display: flex;
margin-bottom: 13.6rem;
justify-content: center;
align-items: center;
img {
&[alt="sfac"] {
width: 20.8rem;
transform: translateY(0.24rem);
}
&[alt="ORCA BOOKS"] {
width: 15rem;
}
}
}
}
  table {
  border-width: 1px 0;
  tr {
  th, td {
  vertical-align: middle;
  padding: 1.8rem 0.8rem;
  overflow: hidden;
  overflow-wrap: break-word;
  &:first-child {
  border-left: none;
}
  &:last-child {
  border-right: none;
}
  text-align: center;
  vertical-align: center;
  padding: 1.8rem 0.9rem;
  box-sizing: border-box;
  &:not(:last-child) {
  border-right: 1px solid black;
}
}
  th {
  background-color: #E6E6E6;
}
td {
&.exp-schedule {
div {
white-space: nowrap;
&.separator {
display: none;
}
&:nth-child(3) {
&:before {
content: '-';
}
}
}
}
}
}
}
}

@media screen and (max-width: ${props => props.theme.widthTabletSmall}) {
.intro-wrapper > div section table tr td.exp-schedule > div {
white-space: pre-line;
&.separator {
display: block;
}
}
}

@media screen and (max-width: ${props => props.theme.widthMobileScreen}) {
  padding: 1.3rem 0;
  & > div {
  font-size: ${props => props.theme.fontSizeMobile};
 width: calc(100% - 2.6rem);
 max-width: calc(100% - 2.6rem);
 p.artists {
  padding-left: 8.8rem !important;
  text-indent: -8.8rem !important;
 }
}
}
`

export default React.memo(IntroView)
