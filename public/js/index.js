$(function () {
  searchWord = function(){
    var searchResult,
        searchText = $(this).val(), // 検索ボックスに入力された値
        targetText,
        hitNum;

    // 検索結果を格納するための配列を用意
    searchResult = [];

    // 検索結果エリアの表示を空にする
    $('#search-result__list').empty();
    $('.search-result__hit-num').empty();

    // 検索ボックスに値が入ってる場合
    if (searchText != '') {
      $('.target-area li').each(function() {
        targetText = $(this).text();

        // 検索対象となるリストに入力された文字列が存在するかどうかを判断
        if (targetText.indexOf(searchText) != -1) {
          // 存在する場合はそのリストのテキストを用意した配列に格納
          searchResult.push(targetText);
        }
      });

      // 検索結果をページに出力
      for (var i = 0; i < searchResult.length; i ++) {
        $('<span>').text(searchResult[i]).appendTo('#search-result__list');
      }

      // ヒットの件数をページに出力
      hitNum = '<span>検索結果</span>：' + searchResult.length + '件見つかりました。';
      $('.search-result__hit-num').append(hitNum);
    }
  };

  // searchWordの実行
  $('#search-text').on('input', searchWord);

　//$("#list_dashboard").load("dashboard.html #target-area-list li");
  
  var parameter = getParameter();
  if(parameter != ''){
    var e = document.getElementById('list');
    var elemLi = document.createElement('li');    //  要素を生成
    elemLi.textContent =  parameter               //  文字列設定
    e.appendChild(elemLi);                        //  要素を追加
  }

  var pageList = ['dashboard', 'orders', 'products', 'customers'];
　var i;
  for(i = 0; i < pageList.length; ++i){
    load_html_and_insert(pageList[i] + '.html', ["list", "target-area-list"], parameter);
  }
  
});

/**
 * @brief use Ajax(jQuey) to get external html and extract by id and insert by id.
 *
 * @param html_url url or lelative path or...
 * @param insert_info_arr 2d-array like std::vector<std::array<std::string, 2>>.
 *
 * @return none.
 */
var load_html_and_insert = function (html_url, insert_info_arr, parameter){
    $.ajax(html_url, {
        timeout : 1000,
        datatype: 'html'
    }).then(function(data){
        var out_html = $($.parseHTML(data));//parse

        var i;
        var listById = out_html.find("#" + insert_info_arr[1])[0].innerHTML;

        if ( listById.indexOf(parameter) != -1) {
              var elemLi = document.createElement('ul');    //  要素を生成
              elemLi.textContent =  listById                //  文字列設定
              alert(elemLi);
              $("#" + insert_info_arr[0]).append(elemLi);//insert
        }
    }, function(jqXHR, textStatus) {
        if(textStatus!=="success") {
            var txt = "<p>textStatus:"+ textStatus + "</p>" +
                "<p>status:"+ jqXHR.status + "</p>" +
                "<p>responseText : </p><div>" + jqXHR.responseText +
                "</div>";
            $("#" + insert_info_arr[0]).append(txt);
        }
    });
};


function enter(code)
{
  //エンターキー押下なら
  if(13 === code)
  {
    var para = '?' + document.getElementById('search-text').value;
    window.location.href = 'searchresult.html' + para; // 通常の遷移
  }
}


function getParameter(){
  // URLのパラメータを取得
  var urlParam = location.search.substring(1);
 
  // URLにパラメータが存在する場合
  if(urlParam) {
    return decodeURI(urlParam)
  }else{
    return ''
  }
 
}