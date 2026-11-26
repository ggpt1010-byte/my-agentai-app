import type {ReactNode} from 'react';
import {ExternalLink,GraduationCap,House,AlertCircle,CheckCircle2,Clock,KeyRound,MapPin,Phone,ShieldCheck} from 'lucide-react';

/* 정적 안내 콘텐츠 — 저장 데이터(planners)와 무관하며 스키마를 바꾸지 않습니다. */

type Status='done'|'now'|'todo';
const statusLabel:Record<Status,string>={done:'완료',now:'진행 중',todo:'할 일'};
function Status({s,children}:{s:Status,children?:ReactNode}){return <span className={'guide-status '+s}>{children||statusLabel[s]}</span>}
function Note({children}:{children:ReactNode}){return <div className="guide-note"><strong>내 상황</strong><span>{children}</span></div>}
function Quiz({children}:{children:ReactNode}){return <div className="guide-quiz"><strong>확인 문제</strong><span>{children}</span></div>}
function Must({children}:{children:ReactNode}){return <div className="guide-must"><strong>직접 해야 할 것</strong><span>{children}</span></div>}
function Page({title,en,tag,children}:{title:string,en:string,tag?:ReactNode,children:ReactNode}){return <details className="guide-page"><summary><span><strong>{title}</strong><small>{en}</small></span>{tag}</summary><div className="guide-body">{children}</div></details>}
function Ext({href,children}:{href:string,children:ReactNode}){return <a className="guide-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={11}/></a>}

export function PrearrivalGuide(){
 return <>
  <div className="info-box"><GraduationCap size={20}/><span>UCSB OISS의 <strong>Welcome to UCSB for J-1 Scholars</strong>(Homebase, 약 1시간) 과정 24페이지를 한국어로 정리했어요. 미국 도착 전에 끝내야 하고, 도착 후 OISS가 수료 여부를 확인한 다음 SEVIS에서 J-1 프로그램을 활성화해요.</span></div>

  <div className="dashboard-grid">
   <section className="panel"><div className="panel-head"><div><span className="eyebrow">ACTION REQUIRED</span><h2>읽기만 해서는 체크가 안 되는 페이지</h2></div></div>
    <ul className="guide-list">
     <li><Status s="todo">게시</Status><span><strong>Culture Shock</strong> — 짧은 본인 영상을 New Post로 올리고, 다른 사람 영상 2개 이상에 Reply</span></li>
     <li><Status s="todo">게시</Status><span><strong>Getting Involved</strong> — 관심 있는 동아리·단체와 참여 이점을 글로 올리기</span></li>
     <li><Status s="todo">응답</Status><span><strong>Homebase Survey · Quiz</strong> — 마지막에 직접 응답</span></li>
     <li><Status s="todo">클릭</Status><span><strong>See You Soon!</strong> — 모든 페이지 체크 후 <em>Complete Course and Receive Certificate</em> → 수료증 이메일</span></li>
     <li><Status s="now">제출</Status><span>페이지 중간의 확인 문제(Submit)는 제출해야 체크가 생겨요</span></li>
    </ul>
   </section>
   <section className="panel"><div className="panel-head"><div><span className="eyebrow">OISS CONTACT</span><h2>국제학생·학자 사무소</h2></div><ShieldCheck size={20}/></div>
    <div className="guide-facts">
     <div><span>위치</span><strong>Student Resource Building 3층, Suite 3130</strong></div>
     <div><span>운영 시간</span><strong>월–금 10:00–12:00, 13:00–16:00</strong></div>
     <div><span>이메일</span><strong className="selectable">j1scholar@sa.ucsb.edu</strong></div>
     <div><span>전화</span><strong>805-893-2929</strong></div>
     <div><span>J-1 scholar 담당</span><strong>Mavel M Marina · Felipe Recinos</strong></div>
    </div>
    <div className="panel-foot">주말·학교 휴일 휴무<span>Pacific Time 기준</span></div>
   </section>
  </div>

  <section className="panel guide-section"><div className="panel-head"><div><span className="eyebrow">01 · GETTING STARTED</span><h2>과정 안내와 J-1 프로그램</h2></div></div>
   <Page title="과정 안내" en="Welcome to UCSB! · Homebase">
    <ul><li>새로 오는 <b>모든 J-1 scholar 필수</b>, 미국 도착 전 완료.</li><li>한 번에 다 안 해도 되고 진행 상황이 저장돼요. 다 본 페이지는 왼쪽 메뉴에 체크.</li><li>수료증은 OISS가 직접 확인하므로 따로 보낼 필요 없어요.</li></ul>
   </Page>
   <Page title="OISS 소개" en="Office of International Student and Scholar Services">
    <p>위치·연락처는 위 카드 참고.</p>
    <Quiz>OISS가 하는 일 → <b>취업 가능 여부 상담</b>, <b>F-1·J-1·H-1B·TN·E-3 체류 신분 상담</b>, <b>여행 서명·상담</b>. 세금 신고 대행은 아님.</Quiz>
   </Page>
   <Page title="J-1 교류방문자 프로그램" en="Understanding the J-1 Exchange Visitor Program">
    <ul><li>목적은 교육·문화 교류. 끝나면 <b>본국에 돌아가 경험을 공유</b>하는 것이 전제예요.</li><li>비이민 비자라 <b>해외 거주지 유지 + 프로그램 후 출국 의사</b>를 영사에게 보여줘야 해요.</li></ul>
    <div className="table-scroll"><table><thead><tr><th>카테고리</th><th>기간</th><th>재참여 제한</th><th>212(e)</th></tr></thead><tbody>
     <tr><td><strong>Short-Term Scholar</strong> <span className="tag green">내 카테고리</span></td><td>1일 – 6개월</td><td>12·24개월 제한 없음</td><td>적용될 수 있음</td></tr>
     <tr><td>Research Scholar / Professor</td><td>3주 – 5년</td><td>24개월 제한</td><td>적용될 수 있음</td></tr>
     <tr><td>Student Non-Degree</td><td>3주 – 2년</td><td>6개월 초과 시 12개월</td><td>—</td></tr>
    </tbody></table></div>
    <Note>6개월 한도라 연장 여유가 거의 없어요. 재참여 제한이 없어 나중에 Research Scholar로 다시 오는 데 걸림돌이 없어요. 비자 스탬프에 212(e) 표기 여부를 받은 뒤 확인하세요.</Note>
   </Page>
   <Page title="캠퍼스 커뮤니티" en="UC Santa Barbara's Campus Community" tag={<span className="tag">선택</span>}>
    <p>자기소개 게시판(이름·출신·관심사·사진). 선택 사항이에요.</p>
   </Page>
  </section>

  <section className="panel guide-section"><div className="panel-head"><div><span className="eyebrow">02 · OBTAINING J-1 STATUS</span><h2>비자 받기</h2></div></div>
   <Page title="비자 절차 순서" en="Overview">
    <ol className="guide-steps">
     <li><span>DS-2019 출력 → 날짜 쓰고 서명</span><Status s="todo"/></li>
     <li><span>SEVIS I-901 납부 ($220)</span><Status s="done">완료 11/20</Status></li>
     <li><span>DS-160 작성 + 비자 수수료(MRV) 납부</span><Status s="now">사진 업로드 대기</Status></li>
     <li><span>비자 인터뷰 예약</span><Status s="todo"/></li>
     <li><span>인터뷰 — 추가 행정심사(SNS 심사 등) 가능</span><Status s="todo"/></li>
     <li><span>비자를 받은 뒤 항공권 확정</span><Status s="todo"/></li>
    </ol>
   </Page>
   <Page title="SEVIS I-901 비용" en="Paying the SEVIS I-901 Fee">
    <ul><li><Ext href="https://www.fmjfee.com">fmjfee.com</Ext>에서 납부. UCSB 프로그램 번호 <b>P-1-03332</b>, SEVIS 번호는 DS-2019 오른쪽 위.</li><li>영수증은 <b>비자 인터뷰</b>와 <b>미국 입국·재입국</b> 때 지참.</li></ul>
    <Quiz>“비자 인터뷰 예약 전에 I-901을 내야 한다” → <b>True</b></Quiz>
   </Page>
   <Page title="DS-160과 인터뷰 예약" en="Applying for the J-1 Visa">
    <ul><li>제출 후 <b>바코드 확인 페이지만</b> 출력하면 돼요.</li><li>비자 수수료 <b>$185</b>는 I-901과 별개, <b>환불·양도 불가</b>. 다른 나라 대사관으로 바꾸면 재납부.</li><li>수수료를 먼저 내야 예약할 수 있고, 대사관이 대신 예약해 주지 않아요. 본국(한국)에서 신청하는 게 가장 수월해요.</li></ul>
   </Page>
   <Page title="비자 인터뷰" en="Visa Interview">
    <p>체류 기간과 귀국 후 경험 활용 계획을 물어요. 영사는 <b>본국과의 유대</b>(가족, 재산, 학교·직장, 계좌)를 봐요.</p>
    <div className="table-scroll"><table><thead><tr><th>가져갈 서류</th><th>준비 상태</th></tr></thead><tbody>
     <tr><td>유효한 여권</td><td>2032년 7월 만료</td></tr>
     <tr><td>DS-2019 (서명본)</td><td>출력·서명 필요</td></tr>
     <tr><td>DS-160 확인 페이지</td><td>사진 업로드 후 제출</td></tr>
     <tr><td>여권 사진 2장 (5×5cm)</td><td>사진관 인화본</td></tr>
     <tr><td>비자 수수료 · I-901 영수증</td><td>I-901 완료</td></tr>
     <tr><td>재정 증빙</td><td>잔고증명서, BK21 확정 메일</td></tr>
     <tr><td>귀국 의사 증빙</td><td>재학증명서, 지도교수 레터</td></tr>
    </tbody></table></div>
    <ul><li>비자를 받기 전에는 <b>항공권을 확정하지 마세요</b>.</li><li>추가 행정심사(administrative processing) 통보를 받으면 <b>즉시 OISS와 초청 학과에 알리기</b>.</li><li>준비 팁: 짧고 긍정적으로, 본인이 직접, 연구 계획과 진로 연결, 서류는 한눈에(인터뷰 2~3분).</li></ul>
    <Note>하드웨어 가속기·반도체 분야는 추가 심사가 걸릴 수 있어요. Strukov 교수님의 연구 내용 설명 레터(기초 학술 연구, 공개 발표 예정)를 영문으로 준비하면 좋아요. 2026년 2월 ESTA 방문(ISSCC)도 물어보면 간단히 설명.</Note>
    <div className="guide-qa">
     <div><span>Why are you going to the US?</span><strong>UCSB Strukov 교수 연구실 방문연구 (조합최적화 하드웨어 가속기)</strong></div>
     <div><span>Why this university?</span><strong>해당 분야 선도 연구실, CMOS Ising·확률적 컴퓨팅 연구와 직결</strong></div>
     <div><span>How will you cover expenses?</span><strong>개인 자금(잔고증명) + BK21 지원</strong></div>
     <div><span>What after the program?</span><strong>고려대 박사과정 복귀, 학위 마무리</strong></div>
    </div>
    <Quiz>인터뷰 필수 서류 → <b>DS-160, 여권, 재정 증빙, DS-2019</b>. 보험 증명·대학 점퍼는 아님.</Quiz>
   </Page>
  </section>

  <section className="panel guide-section"><div className="panel-head"><div><span className="eyebrow">03 · PREPARE TO TRAVEL</span><h2>출국과 정착 준비</h2></div></div>
   <Page title="출국 준비" en="Preparing for Travel">
    <ul><li>짐 지연에 대비해 <b>1~3일치 필수품은 기내 가방</b>에.</li><li>캐리어 안팎에 미국 주소·전화번호 이름표.</li><li><b>입국 때 지참</b>: 여권, J-1 비자, DS-2019, UCSB 학과 지원 레터.</li><li>있으면 좋은 것: 미국·한국 연락처, LA 총영사관 주소, 학위증 사본.</li></ul>
    <Quiz>입국 심사 때 필요한 서류 → <b>DS-2019, 여권, 비자</b></Quiz>
   </Page>
   <Page title="미국 입국 심사" en="Travel and the U.S. Port of Entry">
    <ul><li>CBP 심사 때 초청장·재정 서류도 꺼내기 쉽게.</li><li>전자 출입국 기록 <b>I-94</b>: 신분 <b>J-1</b>, 기한 <b>D/S</b>. 입국 후 최신 I-94를 조회·출력해 오류 확인, 오류 시 OISS 연락.</li><li>양손 검지 지문과 얼굴 사진 촬영.</li></ul>
   </Page>
   <Page title="UCSB까지 가는 법" en="Traveling to UCSB">
    <ul><li>가장 가까운 대형 국제공항은 <b>LAX</b>, 차로 약 2시간.</li><li>가장 흔한 방법은 <Ext href="https://www.sbairbus.com">Santa Barbara Airbus</Ext>. 택시·Uber는 혼자면 비싸요.</li><li>대안: SBA 환승, SFO 경유, LAX FlyAway 버스 → Amtrak 열차.</li></ul>
    <Note>현지 교통 탭의 LAX·SFO·SBA 이동편 후보에 실제 요금을 입력하면 항공권 총액 비교에 반영돼요.</Note>
   </Page>
   <Page title="미국 휴대폰" en="Cell Phones">
    <ul><li>확인할 것: 폰 언락·eSIM 지원, 요금 방식, 약정·해지 수수료, 미국 계좌·SSN 필요 여부, 데이터, 국제전화.</li><li><b>OISS 안내데스크 무료 SIM</b>.</li><li>CampusSIMs(Mint) 월 $15~, 미국 계좌·SSN 없이 한국에서 eSIM 개통, 3·6·12개월 단위. Visible(Verizon) 월 $25~.</li></ul>
    <Note>출국 1~2주 전 6개월 eSIM을 가입하고 도착 직후 개통. 한국 유심은 유지해 인증 문자를 계속 받기.</Note>
   </Page>
   <Page title="집 구하기" en="Housing">
    <p>요약과 링크는 <b>집 구하기</b> 탭에 따로 정리했어요.</p>
   </Page>
   <Page title="생필품 주문" en="Ordering Necessities">
    <ul><li>Amazon Prime 30일 무료. 수령 장소(집·학과·OISS) 가능 여부 먼저 확인, 집이 준비 전이면 픽업 락커.</li></ul>
   </Page>
  </section>

  <section className="panel guide-section"><div className="panel-head"><div><span className="eyebrow">04 · AFTER YOU ARRIVE</span><h2>도착 후</h2></div></div>
   <Page title="OISS 입국 체크인" en="Immigration Check-in With OISS" tag={<span className="tag warm">필수</span>}>
    <ul><li>도착 후 <b>UCSBGlobal 체크인 e-form</b> 제출 → OISS가 SEVIS에서 프로그램 활성화.</li><li><b>미국 안에서만</b> 가능.</li><li>이후 J-1 오리엔테이션 초대 (SSN, 캘리포니아 운전면허 안내).</li></ul>
    <Note>프로그램 시작 30일 전(2027년 1월 초) 안내 메일이 와요. 2/9 이후 도착하면 바로 제출.</Note>
   </Page>
   <Page title="교통" en="Transportation">
    <ul><li>국제운전면허로 운전 가능하지만 자주 운전하면 CA 면허 권장. 차량 등록·책임보험 필요, 캠퍼스 주차 유료.</li><li><Ext href="https://sbmtd.gov">MTD 버스</Ext>: 학생은 무료지만 <b>방문학자는 패스 구매</b>(UCSB Bookstore, Chapala St. Transit Center).</li><li>자전거는 금속 U자형 자물쇠. Uber·Lyft는 뒷좌석이 관례.</li></ul>
   </Page>
   <Page title="사기 주의" en="Avoiding Scams">
    <ul><li><b>전화</b>: 법적 조치·체납을 들먹이며 송금 요구 → 음성사서함, 번호 검색, OISS·경찰 문의.</li><li><b>이메일</b>: 로고 도용, 맞춤법 오류, 위협, 갑작스런 취업 제안.</li><li><b>집 사기</b>: 너무 싼 월세, “해외라 못 보여준다”, Western Union·MoneyGram 송금 요구.</li></ul>
    <Quiz>USCIS라며 48시간 안에 $5,000 송금 요구 → <b>끊고 OISS에 연락</b></Quiz>
   </Page>
  </section>

  <section className="panel guide-section"><div className="panel-head"><div><span className="eyebrow">05 · CULTURE &amp; CAMPUS</span><h2>문화와 캠퍼스 생활</h2></div></div>
   <Page title="문화 충격" en="Culture Shock" tag={<span className="tag warm">게시 필요</span>}>
    <p>새 생활 방식에서 오는 혼란을 다룬 영상 2개를 봐요.</p>
    <Must>New Post로 <b>짧은 영상</b> 올리기 + 다른 사람 영상 <b>2개 이상</b>에 Reply. 질문 예: What is culture shock? · Have you experienced it? · How can you overcome it?</Must>
    <Note>2026년 ISSCC 샌프란시스코 방문 경험(팁 문화, 단위, 식사량)을 예로 30초~1분이면 충분해요.</Note>
   </Page>
   <Page title="안전" en="Safety">
    <div className="table-scroll"><table><thead><tr><th>기관</th><th>연락처</th></tr></thead><tbody>
     <tr><td><strong>응급 (경찰·화재·의료)</strong></td><td>911 (캠퍼스 유선은 9-911)</td></tr>
     <tr><td>UCSB 경찰</td><td>(805) 893-3446</td></tr>
     <tr><td>Isla Vista Foot Patrol</td><td>(805) 681-4179</td></tr>
     <tr><td>CSO 안전 동행</td><td>(805) 893-2000</td></tr>
     <tr><td>CARE</td><td>(805) 893-4613</td></tr>
    </tbody></table></div>
    <Quiz>캠퍼스 응급 상황 → <b>911</b></Quiz>
   </Page>
   <Page title="캠퍼스 활동" en="Getting Involved" tag={<span className="tag warm">게시 필요</span>}>
    <ul><li>Shoreline Events, English Conversation Club, The Gaucho Network, International Education Week.</li></ul>
    <Must>관심 있는 단체와 참여하면 좋은 점을 New Post로. 예: English Conversation Club, IEEE 학생 지부.</Must>
   </Page>
   <Page title="설문 · 퀴즈 · 수료증" en="Homebase Survey · Quiz · See You Soon!">
    <ol className="guide-steps"><li><span>Survey 응답</span></li><li><span>Quiz — 위 확인 문제 내용이 나올 가능성이 높아요</span></li><li><span>왼쪽 메뉴에서 모든 페이지 체크 확인</span></li><li><span>Complete Course and Receive Certificate → 이메일 수료증</span></li></ol>
   </Page>
   <div className="panel-foot">2026-11-25에 Homebase 과정(코드 2360) 본문을 읽고 요약<span>금액·연락처는 바뀔 수 있어요</span></div>
  </section>
 </>;
}

const housingLinks:{title:string,desc:string,href:string,tag:string,icon:any}[]=[
 {title:'UCSB Rental Listings',desc:'UCSB 관계자 전용 매물. Faculty/Staff Login → UCSB login(NetID)으로 들어가요.',href:'https://rentallistings.housing.ucsb.edu/',tag:'공식 · 로그인',icon:KeyRound},
 {title:'Sublease 게시판',desc:'6개월 체류에 가장 맞는 서블렛·계약 양도 모음. 2월 입주 매물은 12월 말~1월에 많이 올라와요.',href:'https://rentallistings.housing.ucsb.edu/uscb-offcampus/subleases',tag:'핵심',icon:House},
 {title:'Faculty/Staff Registration',desc:'NetID 로그인이 안 될 때 방문연구자 계정 신청. Community Housing Office 승인 후 열람.',href:'https://rentallistings.housing.ucsb.edu/faculty_registration',tag:'대안',icon:KeyRound},
 {title:'Community Rental Listings 안내',desc:'UCSB 주거 서비스의 오프캠퍼스 매물 사용 안내와 FAQ.',href:'https://housing.ucsb.edu/current-residents/community-rental-listings/overview',tag:'공식',icon:ShieldCheck},
 {title:'OISS Housing',desc:'국제학생·학자 사무소의 주거 안내.',href:'https://oiss.ucsb.edu/life-at-ucsb/housing',tag:'공식',icon:ShieldCheck},
 {title:'West Campus Cottages',desc:'방문자용 단기 숙소. 도착 후 1~2주 임시 숙소 후보.',href:'https://www.conferences.ucsb.edu/accommodations/visitors/west-cottages',tag:'단기',icon:Clock},
 {title:'The Club & Guest House',desc:'캠퍼스 안 호텔. 가격·빈방은 직접 확인.',href:'http://www.theclub.ucsb.edu/',tag:'단기',icon:Clock},
 {title:'Isla Vista 세입자 권리',desc:'IV Community Services District의 세입자 안내와 임대 분쟁 조정. 학생이 아니어도 이용 가능.',href:'https://islavistacsd.ca.gov/know-your-rights-tenants',tag:'계약',icon:AlertCircle},
 {title:'MTD 버스 노선',desc:'버스 정류장 가까운 집을 고르기 위한 노선·시간표. 방문학자는 패스 구매.',href:'https://sbmtd.gov',tag:'교통',icon:MapPin},
];

export type Snapshot={name:string,area:string,room:string,rent:number,price:string,period:string,type:string,note:string,fit:'good'|'ok'|'weak'};
const candidates:Snapshot[]=[
 {name:'6512 Segovia Rd',area:'Isla Vista',room:'2인실',rent:750,price:'$750',period:'지금 ~ 2027.08',type:'계약 양도 · 2인실',note:'종료 시점이 딱 맞지만 즉시 입주 조건, 방이 좁음',fit:'ok'},
 {name:'6565 Sabado Tarde',area:'Isla Vista',room:'2인실',rent:1156,price:'$1,156',period:'1/1 ~ 6/14',type:'서블렛 · 2인실',note:'교환학생 자리, 남학생 4명과 공용',fit:'ok'},
 {name:'6646 Sabado Tarde',area:'Isla Vista',room:'2인실',rent:1250,price:'$1,250',period:'12/12 ~ 2027.06',type:'서블렛 · 2인실',note:'남학생·학생 한정',fit:'weak'},
 {name:'6654 Trigo Rd',area:'Isla Vista',room:'2인실',rent:995,price:'$995',period:'봄 학기',type:'서블렛 · 2인실',note:'가구, 집 안 세탁기',fit:'ok'},
 {name:'6645 Del Playa',area:'Isla Vista',room:'1인실',rent:1280,price:'$1,280',period:'2026-27 학년도',type:'1인실',note:'바다 전망, 남학생 3명과 공용',fit:'good'},
 {name:'6873 Fortuna Rd',area:'Goleta',room:'기타',rent:1125,price:'$1,125',period:'2027.04.15~',type:'일반 매물',note:'조건 문의 필요',fit:'ok'},
 {name:'457 Greenleaf Ct',area:'Goleta',room:'기타',rent:1800,price:'$1,800',period:'2027.01.01~',type:'일반 매물',note:'조건 문의 필요',fit:'ok'},
];
const fitLabel={good:'후보',ok:'검토',weak:'조건 불리'};

export function HousingGuide({depart,ret,mine,added,onAdd}:{depart:string,ret:string,mine:ReactNode,added:string[],onAdd:(c:Snapshot)=>void}){
 return <>
  <div className="info-box"><House size={20}/><span>체류 기간은 <strong>{depart.replaceAll('-','.')} ~ {ret.replaceAll('-','.')}</strong>. 미국 임대는 <strong>대부분 12개월 계약</strong>이라, 6개월은 <strong>서블렛·계약 양도·룸쉐어</strong> 위주로 찾는 게 현실적이에요.</span></div>

  {mine}

  <div className="metric-grid">
   <section className="metric"><div className="metric-label">방 하나 (룸쉐어)<House size={17}/></div><strong>$1,000–1,800</strong><p>월세 · 2026.11 매물 기준</p></section>
   <section className="metric"><div className="metric-label">스튜디오 · 원룸<House size={17}/></div><strong>$1,200–3,000</strong><p>12개월 계약 아파트 기준</p></section>
   <section className="metric warm-metric"><div className="metric-label">입주 시 목돈<AlertCircle size={17}/></div><strong>월세 × 2–3</strong><p>첫 달 + 마지막 달 + 보증금</p></section>
   <section className="metric green-metric"><div className="metric-label">추가 생활비<CheckCircle2 size={17}/></div><strong>$500+</strong><p>공과금 약 $100 · 식비 최소 $400</p></section>
  </div>

  <section className="panel"><div className="panel-head"><div><span className="eyebrow">WHERE TO SEARCH</span><h2>집 구하기 링크 <span className="count-badge">{housingLinks.length}</span></h2></div></div>
   <div className="link-grid">{housingLinks.map(l=><a key={l.href} className="link-card" href={l.href} target="_blank" rel="noopener noreferrer"><span className="link-icon"><l.icon size={17}/></span><span className="link-text"><strong>{l.title} <ExternalLink size={11}/></strong><small>{l.desc}</small></span><span className="tag">{l.tag}</span></a>)}</div>
   <div className="panel-foot">UCSB Community Housing Office · UCen 3151 · 805-893-4371 · housinginfo@housing.ucsb.edu<span>링크는 새 탭에서 열려요</span></div>
  </section>

  <div className="dashboard-grid">
   <section className="panel"><div className="panel-head"><div><span className="eyebrow">STRATEGY</span><h2>추천 순서</h2></div></div>
    <ol className="guide-steps">
     <li><span><b>12월</b> — NetID로 매물 사이트 로그인, 시세 파악. Strukov 연구실·Shannon에게 이전 방문자 숙소 문의</span><Status s="now"/></li>
     <li><span><b>12월 말~1월</b> — 2월 입주 서블렛·룸쉐어 집중 탐색, 화상 투어로 확인</span><Status s="todo"/></li>
     <li><span><b>HOUSEMATE</b> 탭에 “방문연구자, 2/9~8/8, 1인실 희망” 글 올리기</span><Status s="todo"/></li>
     <li><span>도착 후 <b>1~2주 임시 숙소</b>를 따로 잡아두고 직접 보고 결정</span><Status s="todo"/></li>
     <li><span>한 곳이 어려우면 <b>2~6월 서블렛 + 6~8월 여름 서블렛</b>으로 나누기</span><Status s="todo"/></li>
    </ol>
   </section>
   <section className="panel"><div className="panel-head"><div><span className="eyebrow">AREAS</span><h2>지역 고르기</h2></div><MapPin size={20}/></div>
    <div className="guide-facts">
     <div><span>Isla Vista</span><strong>캠퍼스 바로 옆, 도보·자전거 통학. 학생 위주라 시끄러울 수 있고 Goleta보다 비싼 편</strong></div>
     <div><span>Goleta</span><strong>버스 10~20분. 조용하고 선택지가 넓음. 버스 정류장 가까운 곳으로</strong></div>
     <div><span>Santa Barbara 시내</span><strong>생활 편의는 좋지만 통학 시간이 길고 월세가 높음</strong></div>
    </div>
   </section>
  </div>

  <section className="panel"><div className="panel-head"><div><span className="eyebrow">SNAPSHOT · 2026-11-25</span><h2>사이트에서 본 후보 <span className="count-badge">{candidates.length}</span></h2><p className="panel-sub">로그인 후 확인한 당시 게시물 요약이에요. 이미 마감됐을 수 있으니 참고용으로만 보세요.</p></div></div>
   <div className="table-scroll"><table><thead><tr><th>매물</th><th>월세</th><th>기간</th><th>형태</th><th>메모</th><th>적합도</th><th><span className="sr-only">내 후보에 추가</span></th></tr></thead><tbody>
    {candidates.map(c=><tr key={c.name}><td><strong>{c.name}</strong><small>{c.area}</small></td><td><strong>{c.price}</strong></td><td>{c.period}</td><td>{c.type}</td><td className="wrap-cell">{c.note}</td><td><span className={'tag '+(c.fit==='good'?'green':c.fit==='weak'?'warm':'')}>{fitLabel[c.fit]}</span></td><td>{added.includes(c.name)?<span className="tag green">추가됨</span>:<button type="button" className="text-btn" onClick={()=>onAdd(c)} aria-label={c.name+' 내 후보에 추가'}>후보에 추가</button>}</td></tr>)}
   </tbody></table></div>
   <div className="panel-foot">학교 기숙사 계약 양도는 학생 자격이 필요해 방문연구자는 쓸 수 없어요<span>$1,000 안팎은 대부분 2인실</span></div>
  </section>

  <div className="dashboard-grid">
   <section className="panel"><div className="panel-head"><div><span className="eyebrow">BEFORE YOU SIGN</span><h2>계약 전 확인</h2></div></div>
    <ul className="guide-list">
     <li><Status s="todo">확인</Status><span>가구 유무, 세탁기·건조기 — 대부분 <b>비가구</b></span></li>
     <li><Status s="todo">확인</Status><span>공과금 포함 여부 (가스·전기 별도가 흔함, 수도·쓰레기는 보통 포함)</span></li>
     <li><Status s="todo">확인</Status><span>월세의 3배 소득 요구, 보증인·신용조회 필요 여부</span></li>
     <li><Status s="todo">확인</Status><span>세입자 보험(Renter's insurance) 요구 여부</span></li>
     <li><Status s="todo">기록</Status><span>입주 전 기존 손상을 사진·서면으로 남기기 (보증금 반환)</span></li>
    </ul>
   </section>
   <section className="panel"><div className="panel-head"><div><span className="eyebrow">SCAM SIGNS</span><h2>이러면 사기를 의심</h2></div><AlertCircle size={20}/></div>
    <ul className="guide-list">
     <li><Status s="todo">경고</Status><span>시세보다 <b>너무 싼</b> 월세</span></li>
     <li><Status s="todo">경고</Status><span>“해외에 있어서 집을 보여줄 수 없다”는 집주인</span></li>
     <li><Status s="todo">경고</Status><span><b>Western Union·MoneyGram</b> 송금이나 열쇠와 맞바꾸는 선입금 요구</span></li>
     <li><Status s="done">원칙</Status><span><b>직접 보지 않은 집에는 돈을 보내지 않기</b></span></li>
    </ul>
    <div className="panel-foot">의심되면 OISS에 물어보세요<span><Phone size={10}/> 805-893-2929</span></div>
   </section>
  </div>
 </>;
}
