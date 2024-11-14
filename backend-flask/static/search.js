
// 검색 버튼 클릭 이벤트 리스너
document.getElementById("searchItem").addEventListener("click", function() {
    let search = document.getElementById("search")

    if(search.value == "") {
        alert("검색할 키워드를 입력해주세요!");
        search.focus();
        return;
    }

    $.ajax({
    	url:"/searchItem",
        type:"post",
        dataType:"json",
        data:{"search" : search.value},
        success: function(data){
			//console.log(data);
			if(data == 1 || data == "1") {
			    alert("외부 API 연동에 실패하였습니다.");
			    return;
			}

            // 이전 데이터 초기화
            document.querySelector("#news_table tbody").textContent = "";

            let table = document.getElementById("news_table");
            table.style.display = 'table';

            // 데이터 가져와서 출력
			$(data).each(function() {
			    let date = this.date;
			    let link = this.link;
			    let title = this.title;

			    writeTablePage(date, link, title);
			});

        },
        error: function(request, status, error) {
			alert("비동기 요청 중 오류가 발생했습니다.");
			console.log("code : " + request.status);
			console.log("message : " + request.responseText);
			console.log("error : " + error);
		}
	});
});


// enter키 이벤트
function enterkey() {
    if (window.event.keyCode == 13) {
        document.getElementById("searchItem").click();
    }
}


// 가져온 데이터 HTML 출력
function writeTablePage(date, link, title) {
    const html = `
        <tr>
            <th>1</th>
            <th scope="row" style="vertical-align: middle;">${date}</th>
            <td><a href="${link}" target="_blank">${title}</a></td>
        </tr>
    `;

    let tbodywhere = document.querySelector("#news_table tbody");
    tbodywhere.insertAdjacentHTML('beforeend', html);
}