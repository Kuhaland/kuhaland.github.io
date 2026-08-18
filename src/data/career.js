const logos = import.meta.glob(
  '../assets/images/ci/*.{png,jpg,jpeg,svg,webp}',
  { eager: true, import: 'default' }
)

function logoFor(name) {
  const key = name.toLowerCase()
  const hit = Object.keys(logos).find((path) =>
    path.toLowerCase().includes(`/${key}.`)
  )
  return hit ? logos[hit] : null
}

const history = [
  {
    id: 'hantour',
    year: '2008',
    period: '2008. 10 ~ 2010. 09',
    duration: '2년',
    company: '주식회사 한투어',
    companyEn: 'Hantour',
    team: '',
    position: '대리 / 팀원',
    tasks: ['자사 웹사이트 제작 및 유지보수 (디자인)'],
    focus: ['GUI', 'UI·UX기획', '모바일디자인'],
  },
  {
    id: 'plusn-first',
    year: '2011',
    period: '2011. 01 ~ 2014. 04',
    duration: '3년 4개월',
    company: '(주)플러스앤',
    companyEn: 'PlusN',
    team: 'IT연구소 / 디자인팀',
    position: '차장 / 팀장',
    tasks: ['자사 웹사이트·앱 제작 및 유지보수 (디자인/퍼블)'],
    focus: ['반응형웹', 'GUI', '웹표준·웹접근성'],
  },
  {
    id: 'justgo',
    year: '2014',
    period: '2014. 04 ~ 2018. 01',
    duration: '3년 10개월',
    company: '(주)저스트고',
    companyEn: 'JustGo',
    team: '',
    position: '차장 / 팀장',
    tasks: [
      '자사 웹사이트·앱 제작 및 유지보수 (디자인/퍼블)',
      'SI 프로젝트 작업 (디자인/퍼블)',
    ],
    focus: ['반응형웹', '웹표준·웹접근성', 'GUI'],
  },
  {
    id: 'plusn-second',
    year: '2018',
    period: '2018. 04 ~ 2022. 08',
    duration: '4년 5개월',
    company: '(주)플러스앤',
    companyEn: 'PlusN',
    team: 'IT연구소',
    position: '차장 / 팀장',
    tasks: ['자사 웹사이트·앱 제작 및 유지보수 (디자인/퍼블)'],
    focus: ['GUI', '반응형웹', '웹표준·웹접근성'],
  },
  {
    id: 'smartscore',
    year: '2022',
    period: '2022. 09 ~ 재직중',
    duration: '현재',
    company: '주식회사 스마트스코어',
    companyEn: 'SmartScore',
    team: '기술연구소 / 퍼블팀',
    position: '팀원',
    tasks: [
      '자사 웹사이트 및 앱 유지보수 (퍼블)',
      'ERP(국내/해외) 공통 컴포넌트 제작 및 유지보수 (퍼블)',
    ],
    focus: ['GUI', '반응형웹', '웹표준·웹접근성'],
  },
]

export const career = history.map((item) => ({
  ...item,
  logo: logoFor(item.companyEn),
}))

export const careerTotal = '17년 6개월'
