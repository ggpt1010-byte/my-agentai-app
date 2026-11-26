import { z } from 'zod';
const amount=z.number().finite().min(0).max(10000000000);
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!Number.isNaN(Date.parse(v+'T00:00:00Z')),'올바른 날짜를 입력하세요');
const str=z.string().max(1000);
const history=z.object({date, fare:amount, extra:amount, rate:z.number().positive().max(100000)});
export const stateSchema=z.object({
 settings:z.object({depart:date,ret:date, prepStart:date, total:amount,support:amount,personal:amount,rate:z.number().positive().max(100000),months:z.number().min(0.1).max(60),bags:z.number().int().min(1).max(2)}).refine(s=>s.ret>s.depart && s.depart>s.prepStart,'일정 순서를 확인하세요'),
 budgets:z.array(z.object({id:str,name:str,amount,monthly:z.boolean()})).max(40),
 expenses:z.array(z.object({id:str,name:str,category:str,amount,currency:z.enum(['KRW','USD']),date,note:str})).max(3000),
 flights:z.array(z.object({id:str,name:str,airport:z.enum(['LAX','SFO','SBA']),currency:z.enum(['KRW','USD']),fare:amount.nullable(),extra:amount.nullable(),extraForBags:z.number().int().min(1).max(2),outBags:z.number().int().min(0).max(2),inBags:z.number().int().min(0).max(2),hours:z.number().min(0).max(100),stops:z.number().int().min(0).max(5),url:str,note:str,history:z.array(history).max(1000)})).max(100),
 selectedFlight:str.nullable(),
 transports:z.array(z.object({id:str,airport:z.enum(['LAX','SFO','SBA']),name:str,cost:amount.nullable(),currency:z.enum(['KRW','USD']),hours:z.number().min(0).max(100).nullable(),transfers:z.number().int().min(0).max(20),note:str,selected:z.boolean()})).max(100),
 tasks:z.array(z.object({id:str,title:str,category:str,due:date,done:z.boolean()})).max(1000),
 // 집 후보 — 이전 저장 데이터에는 없으므로 기본값 [] (하위 호환)
 homes:z.array(z.object({id:str,name:str,area:str,room:str,url:str,currency:z.enum(['KRW','USD']),rent:amount.nullable(),upfront:amount.nullable(),from:z.union([date,z.literal('')]),to:z.union([date,z.literal('')]),furnished:z.boolean(),utilities:z.boolean(),status:z.enum(['idea','contacted','touring','applied','signed','dropped']),note:str}).refine(h=>!h.from||!h.to||h.to>h.from,'입주일과 종료일 순서를 확인하세요')).max(100).default([])
});
export type Planner=z.infer<typeof stateSchema>;
export const defaultState:Planner={
 settings:{depart:'2027-02-09',ret:'2027-08-08',prepStart:'2026-11-07',total:26000000,support:10000000,personal:0,rate:1400,months:6,bags:2},
 budgets:[{id:'flight',name:'항공권',amount:1800000,monthly:false},{id:'housing',name:'월세',amount:2000000,monthly:true},{id:'living',name:'식비·생활비',amount:1100000,monthly:true},{id:'transport',name:'교통비',amount:150000,monthly:true},{id:'visa',name:'비자·보험',amount:2200000,monthly:false},{id:'other',name:'정착·예비비',amount:2500000,monthly:false}],
 expenses:[],flights:[],selectedFlight:null,
 transports:[{id:'lax',airport:'LAX',name:'공항 셔틀 / Santa Barbara행 버스',cost:null,currency:'USD',hours:null,transfers:0,note:'운영사·정류장·수하물 규정·시간표를 확인한 후 입력',selected:true},{id:'sfo',airport:'SFO',name:'국내선 연결 / 육상 이동',cost:null,currency:'USD',hours:null,transfers:1,note:'연결편 또는 육상 이동의 실제 소요시간·총액을 확인',selected:true},{id:'sba',airport:'SBA',name:'공항 → UCSB 숙소',cost:null,currency:'USD',hours:null,transfers:0,note:'숙소 주소 확정 후 이동 수단과 비용 입력',selected:true}],
 tasks:[{id:'t1',title:'방문 초청장 및 연수 일정 확인',category:'서류',due:'2026-11-20',done:false},{id:'t2',title:'BK21 신청·지원금 지급 조건 확인',category:'서류',due:'2026-11-30',done:false},{id:'t3',title:'DS-2019·비자 절차 및 인터뷰 준비',category:'비자',due:'2026-12-15',done:false},{id:'t4',title:'왕복 항공권·위탁수하물 비교 후 예약',category:'항공',due:'2026-12-20',done:false},{id:'t5',title:'6개월 숙소·계약 조건·보증금 확인',category:'주거',due:'2027-01-09',done:false},{id:'t6',title:'UCSB 요구 보험 및 보장 기간 확인',category:'보험',due:'2027-01-16',done:false},{id:'t7',title:'공항에서 숙소까지 교통편 예약',category:'교통',due:'2027-01-25',done:false},{id:'t8',title:'로밍·유심·해외결제·환전 준비',category:'생활',due:'2027-02-01',done:false},{id:'t9',title:'여권·입국 서류·짐 최종 점검',category:'출국',due:'2027-02-07',done:false},{id:'t10',title:'UCSB 도착 후 체크인 절차 확인',category:'현지',due:'2027-02-10',done:false},{id:'t11',title:'귀국편·퇴실·BK21 결과 보고 준비',category:'귀국',due:'2027-07-25',done:false}],
 homes:[]
};
export const won=(n:number)=>Math.round(n).toLocaleString('ko-KR');
export const money=(n:number)=>'₩'+won(n);
export const krw=(amount:number,currency:string,rate:number)=>Math.round(amount*(currency==='USD'?rate:1));
export const allocation=(s:Planner)=>s.budgets.reduce((a,b)=>a+b.amount*(b.monthly?s.settings.months:1),0);
export const spent=(s:Planner)=>s.expenses.reduce((a,e)=>a+krw(e.amount,e.currency,s.settings.rate),0);
export function transport(s:Planner,airport:string){return s.transports.find(t=>t.airport===airport&&t.selected);}
export function flightCost(s:Planner,f:Planner['flights'][number]){
 const enough=f.outBags>=s.settings.bags&&f.inBags>=s.settings.bags;
 const extra=f.extraForBags===s.settings.bags?f.extra:null;
 const air=f.fare===null||(!enough&&extra===null)?null:krw((f.fare||0)+(enough?0:(extra||0)),f.currency,s.settings.rate);
 const t=transport(s,f.airport),ground=t&&t.cost!==null?krw(t.cost,t.currency,s.settings.rate):null;
 return {air,ground,total:air!==null&&ground!==null?air+ground:null,extraNeeded:!enough};
}
export type Home=Planner['homes'][number];
export const homeStatuses=[{id:'idea',label:'관심'},{id:'contacted',label:'문의함'},{id:'touring',label:'투어·확인'},{id:'applied',label:'신청함'},{id:'signed',label:'계약 완료'},{id:'dropped',label:'제외'}] as const;
const dayDiff=(a:string,b:string)=>Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000);
/** 저장 데이터 보정: 이전 버전 기록에 homes가 없으면 빈 목록으로 채웁니다. */
export function normalizeState(raw:any):Planner{const r=stateSchema.safeParse(raw);return r.success?r.data:{...raw,homes:Array.isArray(raw?.homes)?raw.homes:[]};}
/** 체류 기간(출국일~귀국일) 중 이 집이 덮는 일수와 앞뒤 공백. 날짜 미입력이면 null. */
export function homeCoverage(s:Planner,h:Home){
 if(!h.from||!h.to)return null;
 const {depart,ret}=s.settings,stay=dayDiff(depart,ret);
 const start=h.from>depart?h.from:depart,end=h.to<ret?h.to:ret;
 const days=Math.max(0,dayDiff(start,end));
 return {days,pct:stay?Math.min(100,days/stay*100):0,before:h.from>depart?Math.min(stay,dayDiff(depart,h.from)):0,after:h.to<ret?Math.min(stay,dayDiff(h.to,ret)):0};
}
/** 월세(원화), 체류 기간 중 월세 합계(일할 추정), 월 주거 예산과의 차이. 미입력 금액은 null. */
export function homeCost(s:Planner,h:Home){
 const monthly=h.rent===null?null:krw(h.rent,h.currency,s.settings.rate);
 const cov=homeCoverage(s,h);
 const stay=monthly===null||!cov?null:Math.round(monthly*cov.days*12/365);
 const upfront=h.upfront===null?null:krw(h.upfront,h.currency,s.settings.rate);
 const b=s.budgets.find(x=>x.id==='housing');
 const budget=b&&b.monthly?b.amount:null;
 return {monthly,stay,upfront,budget,overBudget:monthly!==null&&budget!==null?monthly-budget:null};
}
/** '계약 완료' 후보들이 체류 기간을 덮는 비율(겹치는 구간은 한 번만). */
export function securedStay(s:Planner){
 const {depart,ret}=s.settings,stay=dayDiff(depart,ret);
 const iv=s.homes.filter(h=>h.status==='signed'&&h.from&&h.to).map(h=>[h.from>depart?h.from:depart,h.to<ret?h.to:ret]).filter(([a,b])=>b>a).sort((x,y)=>x[0].localeCompare(y[0]));
 let days=0,cur:string[]|null=null;
 for(const [a,b] of iv){if(cur&&a<=cur[1]){if(b>cur[1])cur[1]=b;}else{if(cur)days+=dayDiff(cur[0],cur[1]);cur=[a,b];}}
 if(cur)days+=dayDiff(cur[0],cur[1]);
 return {days,pct:stay?Math.min(100,days/stay*100):0};
}
export function localDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
