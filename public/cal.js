$("#selectBtn").click(function(){ 
    var rowData = new Array();
    var selectedParkings = []; // 선택한 주차장 정보를 담을 배열
    var totalCosts = []; // 각 주차장의 예상 요금을 담을 배열

    var checkbox = $("input[name=parkingAddress]:checked");
    
    // 체크된 값을 가져옴
    checkbox.each(function(i) {
        var tr = checkbox.parent().parent().eq(i);
        var td = tr.children();
        
        // 체크된 row의 모든 값을 배열에 담는다
        rowData.push(tr.text());
        
        // 선택한 주차장 정보를 객체로 만들어 배열에 추가
        var parkingInfo = {
            name: td.eq(1).text(), // 이름
            address: td.eq(2).text(), // 주소
            basicCost: parseInt(td.eq(3).text()), // 기본요금 (30분 기준)
            additionalCost: parseInt(td.eq(4).text()) // 추가요금 (10분 단위)
        };

        selectedParkings.push(parkingInfo);
    });

// 주차장을 7개 이상 선택했을 때, 6개까지만 선택 가능하도록 처리
var selectedCount = selectedParkings.length;
if (selectedCount > 6) {
  // 알림창 띄우기
  var alertMsg = "주차장은 최대 6개까지만 선택 가능합니다.";
  alert(alertMsg);

  // 선택한 값들을 취소
  checkbox.prop("checked", false);

  // chPkList에 아무것도 표시되지 않도록 처리
  $("#chPkList").html("");

  // 선택된 주차장 정보 배열 초기화
  selectedParkings = [];

    }
  
    
    // 사용자로부터 예상 주차 시간을 입력받음
    var estimatedTime = parseInt($("#estimatedTime").val());

    // 선택한 주차장들의 예상 금액을 계산하여 totalCosts에 담음
    selectedParkings.forEach(function(parking) {
        var totalCost = parking.basicCost; // 기본 요금으로 초기화
        var additionalTime = estimatedTime - 30; // 추가 시간 (예상 시간 - 30분)
        
        if (additionalTime > 0) {
            // 추가 시간이 있는 경우 추가 요금 계산
            var additionalCost = Math.ceil(additionalTime / 10) * parking.additionalCost;
            totalCost += additionalCost;
        }
        
        totalCosts.push(totalCost);
    });

     // chPkList에 선택한 주차장들의 예상 금액 출력
    var chPkListHTML = '<div class="parking-grid">'; 

    for (var i = 0; i < selectedParkings.length; i++) {
        chPkListHTML += '<div class="parkinglot">';
        chPkListHTML += "<strong>이름:</strong> " + selectedParkings[i].name + "<br>";
        chPkListHTML += "<strong>기본요금:</strong> " + selectedParkings[i].basicCost + "원<br>";
        chPkListHTML += "<strong>추가요금:</strong> " + selectedParkings[i].additionalCost + "원<br>";
        chPkListHTML += '<strong>예상 요금:</strong> <span style="font-weight: bold; color: red;">' + totalCosts[i] + '원</span>';
        chPkListHTML += "</div>";

        if ((i + 1) % 3 === 0 && i + 1 !== selectedParkings.length) {
        chPkListHTML += "</div><div class='parking-grid'>";
        }
    }

    chPkListHTML += "</div>"; 

    $("#chPkList").html(chPkListHTML);
    });
