## 210122_TravelExpenses_React_Node
SeeLive : https://dev2d0travelexpenses.herokuapp.com/

# 프로젝트 소개
목적지, 여행 일수에 따라 경비가 얼마나 필요한지,  혹은 여행 경비에 따라서 갈 수 있는 목적지와 여행 일수 등이 얼마나 되는지 가늠이 안되는 분들을 위해 정보를 제공 받을 수 있는 웹 서비스를 만들고자 프로젝트를 구상하게 되었음. 
자신이 여행 다녀온, 혹은 계획한 여행 일정과 여행 경비 등 다양한 여행 꿀팁들을 공유하고 사람들에게 자랑할 수 있는 플랫폼 입니다.

좋아요, 팔로우, 스크랩 등 다양한 기능이 제공 됩니다.
마음에 드는 게시물에 좋아요를 누르고 좋은 정보를 공유하는 사용자를 팔로우 하여 팔로우 한 사람의 게시물만 따로 볼 수 있는 페이지가 존재합니다. 또한 스크랩 기능을 통해 유용한 정보들은 스크랩하여 나중에 찾기 쉽게 저장할 수 있습니다


# 사용된 기능
- React
- Node.js
- MongoDB
- Redux

# 주요 기능 
- 회원가입
- 로그인
- 게시물 업로드
- 스크랩
- 좋아요
- 팔로우 
- 필터링
- 더보기
- 신고 등

# 개발 순서 
1. WebFrame 프로젝트에서 제작한 로그인, 회원가입 기능을 이용하여 몽고DB와 연결하며 프로젝트를 시작함.
2. 게시물 업로드 폼 제작
3. 전체 게시물을 예쁘게 볼 수 있도록 랜딩 페이지 제작
4. 랜딩페이지 부가 기능 (CheckBox 제작)
5. 랜딩페이지 부가 기능 (RadioBox 제작)
6. 랜딩페이지 부가 기능 (SearchBox 제작)
7. 특정 게시물을 볼 수 있도록  DetailTravelPage 제작
8. DetailTravelPage 부가 기능(TravelImage 컴포넌트) 제작
9. DetailTravelPage 부가 기능(TravelInfo 컴포넌트) 제작
10. DetailTravelPage 부가 기능(좋아요) 제작
11. DetailTravelPage 부가 기능(Delete) 제작
12. DetailTravelPage 부가 기능(Scrap) 제작
13. 팔로우 기능 제작
14. 팔로우한 사용자의 게시물만 모아서 볼 수 있도록 팔로잉 페이지 제작
15. Scrap한 글을 볼 수 있도록 ScrapPage 제작


# 게시물 업로드 페이지
<img width="1655" alt="스크린샷 2021-02-05 오전 3 37 25" src="https://user-images.githubusercontent.com/39155520/106939345-7c506980-6763-11eb-9c32-2846d1f49d04.png">


# 랜딩 페이지 
<img width="1672" alt="스크린샷 2021-02-03 오전 6 39 10" src="https://user-images.githubusercontent.com/39155520/106939065-1ebc1d00-6763-11eb-96c0-e3cc156252e3.png">

# 필터링
CheckBox를 이용해 여행지 지역을 선택하여 자신이 원하는 지역만의 여행지를 볼 수 있습니다.
RadioBox를 이용하여 자신의 경비에 맞는 금액을 선택하여 해당 경비의 여행지 후기를 볼 수 있습니다.


# Travel 디테일 페이지
 <img width="1651" alt="스크린샷 2021-02-03 오전 6 32 04" src="https://user-images.githubusercontent.com/39155520/106938865-db61ae80-6762-11eb-9ec4-428d68c58822.png">

# 스크랩
마음에 드는 게시물을 스크랩 하여 저장할 수 있습니다.

# 스크랩 페이지
<img width="1639" alt="스크린샷 2021-02-03 오전 6 36 51" src="https://user-images.githubusercontent.com/39155520/106939015-0ba94d00-6763-11eb-8129-5416a2a2eec7.png">

# 좋아요
마음에 드는 게시물에 좋아요를 누를 수 있습니다.

# 팔로우
마음에 드는 유저를 팔로우 할 수 있습니다.

# 팔로잉 페이지
팔로우 한 사용자들의 게시물만 따로 볼 수 있는 페이지가 있습니다.


