// 마커를 담을 배열입니다
var markers = [];
let presentPosition;

/////////////////지도의 중심을 현재 위치로 변경///////////////////////
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(127.114050, 36.8148681), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨 
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon) // geolocation으로 얻어온 좌표
        presentPosition = locPosition;

        map.setCenter(locPosition);

    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 

    var locPosition = new kakao.maps.LatLng(37.566826, 126.9786567)
    alert('현재 위치를 찾을 수 없습니다!');
}

////////////////////장소 검색/////////////////////////////
// 장소 검색 객체를 생성합니다
var ps0 = new kakao.maps.services.Places(); //주차장 검색 변수와 다르게 0추가 

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const searchForm = document.querySelector('.form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // 키워드로 장소를 검색합니다
    searchPlaces0();
})

// 키워드 검색을 요청하는 함수입니다
function searchPlaces0() {

    var keyword = document.getElementById('search-txt').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    
    //이전에 검색했던 마커 삭제
    removeMarker1();
    //인포윈도우 삭제
    infowindow.open(null);

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps0.keywordSearch(keyword, placesSearchCB0);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB0(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();


        for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }
}

function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 배열에 생성된 마커를 추가 
    markers.push(marker);

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}



// 새로 장소 검색시 이전에 남아있던 마커 삭제하는 함수
function removeMarker1() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

/* court 마커 */

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
var geocoder = new kakao.maps.services.Geocoder();

/* 주소 */

//주소 및 상세정보 탑재
var positions = [
    {
        title: '대흥제1(1급지/천안역부근)',
        address: '충남 천안시 동남구 대흥로 205',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '10',
        type: '노외'
    },
    {
        title: '불당 제5주차장(W타워)',
        address: '충남 천안시 서북구 불당25로 154',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '128',
        type: '노외'
    },
    {
        title: '명동주차장(1급지/천안역부근)',
        address: '충남 천안시 동남구 명동길 36',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '77',
        type: '노외'
    }
    ,
    {
        title: '신부 제4(신부동 먹거리9길)',
        address: '충남 천안시 동남구 먹거리9길 17',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '12',
        type: '노외'
    }
    ,
    {
        title: '태조산공원 주차장',
        address: '충남 천안시 동남구 태조산길 261',
        price: '3000',
        price_Per_Min: '0',
        price_Per_day: '3000',
        pk_space: '300',
        type: '노외'
    }
    ,
    {
        title: '두정제1(1급지/주차장)',
        address: '충남 천안시 서북구 두정상가1길 6',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '10',
        type: '노외'
    }
    ,
    {
        title: '두정역 제1(환승공영주차장)',
        address: '충남 천안시 서북구 천안대로 999-22',
        price: '0',
        price_Per_Min: '100',
        price_Per_day: '5000',
        pk_space: '40',
        type: '노외'
    }
    ,
    {
        title: '불당제2(1급지/주차장)',
        address: '충남 천안시 서북구 검은들3길 5',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '10',
        type: '노외'
    }
    ,
    {
        title: '신부제1(터미널/환승/주차장)',
        address: '충남 천안시 동남구 터미널8길 7',
        price: '100',
        price_Per_Min: '20',
        price_Per_day: '5000',
        pk_space: '200',
        type: '노외'
    }
    ,
    {
        title: '쌍용제1(1급지/주차장)',
        address: '충남 천안시 서북구 미라3길 16',
        price: '0',
        price_Per_Min: '100',
        price_Per_day: '10000',
        pk_space: '7',
        type: '노외'
    }
    ,
    {
        title: '불당제1(주차빌딩/주차타워)',
        address: '충남 천안시 서북구 검은들1길 15',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '91',
        type: '노외'
    }
    ,
    {
        title: '대흥로 제1(노상주차장)',
        address: '충남 천안시 동남구 대흥로 225',
        price: '0',
        price_Per_Min: '200',
        price_Per_day: '10000',
        pk_space: '34',
        type: '노상'
    }
    ,
    {
        title: '지하도상가 공영주차장',
        address: '충남 천안시 동남구 버들로 지하2',
        price: '0',
        price_Per_Min: '0',
        price_Per_day: '10000',
        pk_space: '72',
        type: '부설'
    }
];

var imageSize = new kakao.maps.Size(24, 35);

// 마커 이미지를 생성합니다    
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

positions.forEach(function (position) { //추가한 코드
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(position.address, function (result, status) {


        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);


            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage // 마커 이미지 
            });
            

            // 인포윈도우에 탑재한 정보 보여주기
            var content1 =  '<div class="wrap">' + 
                            '    <div class="info">' + 
                            '        <div class="title">' + 
                                      position.title + 
                            '        </div>' + 
                            '        <div class="body">' + 
                            '            <div class="desc">' + 
                            '                <div class="ellipsis">'+position.address+'</div>' +
                            '                <div class="text" target="_blank">'+'구분: '+position.type+'</a></div>' + 
                            '                <div class="text" target="_blank">'+'주차면수: '+position.pk_space+'대'+'</a></div>' +
                            '                <div class="text" target="_blank">'+'기본가격: '+position.price+'원'+'</a></div>' +
                            '                <div class="text" target="_blank">'+'10분당 추가 가격: '+position.price_Per_Min+'원'+'</a></div>' +
                            '                <div class="text" target="_blank">'+'하루 이용 가격: '+position.price_Per_day+'원'+'</a></div>' + 
                            '            </div>' + 
                            '        </div>' + 
                            '    </div>' +    
                            '</div>';



            // 커스텀 오버레이 정의
            var Overlay = new kakao.maps.CustomOverlay({
                content: content1,
                map: map,
                position: coords,
            });

            Overlay.setMap(null);

            var cnt = 0;

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function () {
                ++cnt;
                //클릭 홀수면 나오고 짝수면 숨김
                if(cnt%2!=0){

                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                 // 인포윈도우로 장소에 대한 설명을 표시합니다
                Overlay.setContent(content1);
                Overlay.setMap(null);
                
                }
                else{ 
                    Overlay.setMap(map);
                }
            });
        }
    });
});


/* 주차장 카테고리 */

var ps = new kakao.maps.services.Places(map);

// 지도에 idle 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', searchPlaces);

// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
contentNode.className = 'placeinfo_wrap';

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

// 커스텀 오버레이 컨텐츠를 설정합니다
placeOverlay.setContent(contentNode);

// 각 카테고리에 클릭 이벤트를 등록합니다
addCategoryClickEvent();


// 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}

// 카테고리 검색을 요청하는 함수입니다
function searchPlaces() {
    if (!currCategory) {
        return;
    }

    // 커스텀 오버레이를 숨깁니다 
    placeOverlay.setMap(null);

    //장소검색 마커 삭제
    removeMarker1();

    //장소 검색 마커 인포윈도우 삭제
    infowindow.open(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

    } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요

    }
}

// 지도에 마커를 표출하는 함수입니다
function displayPlaces(places) {

    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    var order = document.getElementById(currCategory).getAttribute('data-order');



    for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다 (주차장 좌표가 들어있는 배열)
        var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
            kakao.maps.event.addListener(marker, 'click', function () {
                displayPlaceInfo(place);
            });
        })(marker, places[i]);
    }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, order) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(30, 33),  // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(46, (order * 36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo(place) {
    var content = '<div class="placeinfo">' +
        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

    if (place.road_address_name) {
        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
            '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }

    content += '    <span class="tel">' + place.phone + '</span>' +
        '</div>' +
        '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
}


// 각 카테고리에 클릭 이벤트를 등록합니다
function addCategoryClickEvent() {
    var category = document.getElementById('category'),
        children = category.children;

    for (var i = 0; i < children.length; i++) {
        children[i].onclick = onClickCategory;
    }
}

// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory() {
    var id = this.id,
        className = this.className;

    placeOverlay.setMap(null);

    if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarker();
    } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
    }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el) {
    var category = document.getElementById('category'),
        children = category.children,
        i;

    for (i = 0; i < children.length; i++) {
        children[i].className = '';
    }

    if (el) {
        el.className = 'on';
    }
}


