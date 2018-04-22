$(function () {

  var parameter = getParameter();

  if(parameter != ''){
      load_html_and_insert(["target-area-list", "target-area-list"], parameter); 
  }
  
});

var load_html_and_insert = function (insert_info_arr, parameter){

        var listById_innerHTML = $(document).find("#" + insert_info_arr[1])[0].innerHTML;
        var parser = new DOMParser();
        var listById_dom = parser.parseFromString(listById_innerHTML, "text/html");

        listById_dom = highLightAllChildsTexts(listById_dom,parameter);

        $("#" + insert_info_arr[0]).empty().append(listById_dom.innerHTML);

};


var doHighLight = function(searchStr, str) {
    if (!searchStr || !str) return 0;
 
    var lowerSearchStr = searchStr.toLowerCase();
    var lowerStr = str.toLowerCase();
    var pos = lowerStr.indexOf(lowerSearchStr);
    var highLitedStr = str;
    let spanHead = '<span class="highlight">';
    let spanTail = '</span>';
    let spanLen = spanHead.length + spanTail.length;
    let searchStrLen = searchStr.length;
    
    while (pos !== -1) {

        highLitedStr = [highLitedStr.slice(0, pos), spanHead , 
                        highLitedStr.slice(pos, pos + searchStrLen), 
                        spanTail,highLitedStr.slice(pos + searchStrLen) ].join('');

        pos = highLitedStr.toLowerCase().indexOf(lowerSearchStr, pos + spanLen + 1);    
    }
 
    return highLitedStr;
};

var highLightAllChildsTexts = function(dom,parameter){
    if(!dom || !parameter) return;

    //var resultDom = dom;
    //resultDom.childNodes = null;

    if(dom.nodeValue!=''|dom.nodeValue!='null'){
      dom.nodeValue = doHighLight(parameter, dom.nodeValue);
      alert(dom.nodeValue);
    }
    
    if(dom.hasChildNodes()){
      var child = dom.childNodes;
      var i;

      for(i = 0; i< child.length; i++){
        alert("child[" + i + "]:" + child[i].nodeValue);
        dom.appendChild(highLightAllChildsTexts(child[i],parameter));
      }

    }

    return dom;  
}


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
    return decodeURI(urlParam).trim();
  }else{
    return '';
  }
 
}