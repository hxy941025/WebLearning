
var regionList = document.getElementById("region-select");
var productList = document.getElementById("product-select");
var showTable = document.getElementById("table-wrapper");

//备用
var areaArr= ["华东","华南","华北"];
var productArr = ["手机","笔记本","智能音箱"];

//清空
areaArr=[];
productArr=[];

//绑定选择事件
regionList.addEventListener("change",selRegion);
productList.addEventListener("change",selProduct);

//选中地区,生成地区表，如果不存在，就添加进去，如果存在，就删除
function selRegion(ev) {
    var area = ev.target.value;
    //如果全选选中，则生成全部地区，再次点击，则清空
    if(area == "全选"){
        if(ev.target.checked){
            areaArr = [];
            areaArr.push("华东","华南","华北");
            checkAll("a");
        }
       else {
            uncheckAll("a");
            areaArr=[];
        }
    }
    //如果不是全选，查询列表中是否存在该地区
    else if( areaArr.indexOf(area)== -1){
        areaArr.push(area);
    }
    else {
        areaArr.splice(areaArr.indexOf(area),1);
    }
    cancelAll("a",areaArr);
    regionTab(areaArr,productArr);
    // console.log(areaArr);
}

function selProduct(ev) {
    var product = ev.target.value;//选中的产品
    if(product == "全选"){
        if(ev.target.checked){
            productArr = [];
            productArr.push("手机","笔记本","智能音箱");
            checkAll("p");
        }
        else {
            uncheckAll("p");
            productArr=[];
        }
    }
    else if( productArr.indexOf(product)== -1){
        productArr.push(product);
    }
    else {
        productArr.splice(productArr.indexOf(product),1)
    }
    cancelAll("p",productArr);
    regionTab(areaArr,productArr);
    // console.log(productArr);
}

//选中全部按钮,通过传入参数判断是地区还是商品
function checkAll(obj) {
    if(obj == "a"){
        var areacheck = regionList.getElementsByTagName("input");
        for (var i=0;i<areaArr.length;i++){
            areacheck[i].checked = true;
        }
    }
   else if(obj == "p"){
        var procheck = productList.getElementsByTagName("input");
        for (var i=0;i<productArr.length;i++){
            procheck[i].checked = true;
        }
    }
}

//取消全部选择,a代表地区，p代表货物
function uncheckAll(obj) {
    if(obj == "a"){
        var areacheck = regionList.getElementsByTagName("input");
        for (var i=0;i<areaArr.length;i++){
            areacheck[i].checked = false;
        }
    }
    else if(obj == "p"){
        var procheck = productList.getElementsByTagName("input");
        for (var i=0;i<productArr.length;i++){
            procheck[i].checked = false;
        }
    }
}

//当全选被选中时，点击其他选项，取消全选,obj判断是地区还是货物，通过arr.length判断是取消还是勾上
function cancelAll(obj,arr) {
    var areacheck = regionList.getElementsByTagName("input");
    var procheck = productList.getElementsByTagName("input");

    if(obj == "a"){
        if(arr.length !== 3){
            areacheck[areacheck.length-1].checked = false;
        }
        else if(arr.length == 3){
            areacheck[areacheck.length-1].checked = true;
        }
    }
    else if(obj == "p"){
        if(arr.length !== 3){
            procheck[procheck.length-1].checked = false;
        }
        else if(arr.length == 3){
            procheck[procheck.length-1].checked = true;
        }
    }
}


//根据选项获取数据
function regionData(areaArr=[],productArr=[]) {
    var allArea = [];
    var allProduct = [];
    var allSale = [];
    //遍历数据库，找出该地区的所有数据
    for (var i=0;i<areaArr.length;i++){
        for (var j=0;j<productArr.length;j++){
            for(x in sourceData){
                if(sourceData[x].region == areaArr[i] &&  sourceData[x].product == productArr[j]){
                    allArea.push(sourceData[x].region);
                    allProduct.push(sourceData[x].product);
                    allSale.push(sourceData[x].sale);
                }
            }
        }

    }
    return [allArea,allProduct,allSale];
}

//将得到的数据生成表格
function regionTab(areaArr,productArr) {
    var data = regionData(areaArr,productArr);
    var areaData = data.splice(0,1)[0];
    var productData = data.splice(0,1)[0];
    var saleData = data.splice(0)[0];

    //获取选中的产品和地区数量，判断该怎么合并,商品数量>1时按照地区合并，其他时候按照商品合并
    var areaLen =areaArr.length;
    var productLen =productArr.length;



    var table = '<table border="1">';

    //生成表头
    table += '<tr>' + '<th>'+ '地区'+ '</th>'+'<th>'+ '商品' + '</th>';
    for(var i=1;i<=12;i++){
        table += '<th>'+ i +'月'+ '</th>';
    }
    table += '</tr>';

    //渲染表格数据
    for (var i=0;i<areaData.length;i++){
        table += '<tr>';

        table += '<td class="area">'+areaData[i]+'</td>' ;
        table += '<td class="product">'+productData[i]+'</td>';


        for (var j=0;j<saleData[i].length;j++){
            table += '<td>'+saleData[i][j]+'</td>';
        }
        table += '</tr>'
    }

    // console.log(areaData,productData,saleData);

    showTable.innerHTML = table + '<table>';


    combineTab();
}

//合并表格函数
function combineTab() {
    var areatab = document.getElementsByClassName("area");
    var product = document.getElementsByClassName("product");
    var num=0;

    //通过商品数目和地区数目的乘判断是?x?的方格，添加rowspan和隐藏
    for(var a=0;a<areatab.length;a++){
        //只在商品数目为1的时候按商品合并，其他时候按地区合并
        if(productArr.length > 1){
            //如果是该地区出现的第一次，就给他添加rowspan，其他的隐藏
            if(a%productArr.length == 0){
                areatab[a].rowSpan =productArr.length;
                console.log(areatab[a]);
            }
            else areatab[a].style.display = "none";
        }
        //商品数目为1时，按照商品合并，第一个改变rowspan，其他的隐藏
        else {
            product[0].rowSpan = areaArr.length;
            for(var p=1;p<areaArr.length;p++){
                product[p].style.display = "none";
            }
        }

    }
}