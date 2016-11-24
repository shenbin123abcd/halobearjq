app.index=(function(){
    var avatarJson;
    function init(){
        avatarJson=window.avatarJson;
        render();
        initSwiper();
        showVideo();
        //common.util.alert_seatRound2();
    }

    function render() {
        // console.log(window.appData)
        var am816=window.appData.am816;
        var pm816=window.appData.pm816;
        var goldFirstRace=generateGoldFirstRace();
        var am817=window.appData.am817;
        var pm817=window.appData.pm817;
        var course817=window.appData.course817;
        var am818=window.appData.am818;
        var pm818=window.appData.pm818;
        var course818=window.appData.course818;
        var supplier=window.appData.supplier;


        $("#am816").append(covert2Html(am816))
        $("#pm816").append(covert2Html(pm816))
        $("#gold-first-race").append(covert2HtmlSecond(goldFirstRace))
        $("#am817").append(covert2Html(am817))
        $("#pm817").append(covert2Html(pm817))
        $("#course817").append(covert2HtmlCourse(course817))
        $("#course818").append(covert2HtmlCourse(course818))
        $("#am818").append(covert2Html(am818))
        $("#pm818").append(covert2Html(pm818))
        $("#supplier-list-box").append(covert2HtmlSupplier(supplier))
        lazy();

    }
    function initSwiper() {
        var swiper = new Swiper('#my-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 4000,
            loop: true,
        });


    }
    function showVideo() {
        $("[video-box]").show();

    }
    function lazy() {
        //console.log($("img.lazy"))

        $("img.lazy").lazyload({
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            effect: "fadeIn",
            failure_limit : 100,
            threshold: 200,
        });
    }



    function covert2Html(data) {
        // console.log(data)

        var htmlStr=``;


        var htmlTitle=`<div class="time-box">/ ${data['title']} /</div>`;


        data.subject.forEach((n,i)=>{
            var labelClass='';
            var groupClass='';
            switch (n.title){
                case '开幕式':
                    labelClass='kmzc';
                    break;


                case '高端宴会设计峰会':
                    labelClass='gdyhsjfh';
                    break;
                case '婚嫁企业总裁论坛':
                    labelClass='hjqyzclt';
                    groupClass='group-in-5';
                    break;
                case '婚嫁企业品牌营销峰会':
                    labelClass='hjqyppyxfh';
                    break;
                case '婚嫁企业运营管理峰会':
                    labelClass='hjqyyyglfh';
                    break;

                case '全球目的地婚礼论坛':
                    labelClass='qqmddhllt';
                    break;
                case '一站式婚礼堂总裁论坛':
                    labelClass='yzshltzclt';
                    break;
                case '婚礼花艺设计表演大赏':
                    labelClass='hlhysjbyds';
                    break;


                case '顶尖婚礼策划师高峰论坛':
                    labelClass='djhlchsgflt';
                    groupClass='group-in-6';
                    break;

                case '婚礼销售谈单培训课程':
                    labelClass='hlxstdpxkc';
                    break;
                case '婚企运营管理培训课程':
                    labelClass='hqyyglpxkc';
                    break;
                case '婚礼服务执行培训课程':
                    labelClass='hlfwzxpxkc';
                    break;
                case '婚礼策划设计培训课程':
                    labelClass='hlchsjpxkc';
                    break;
                case '婚礼灯光舞美培训课程':
                    labelClass='hldgwmpxkc';
                    break;
                case '婚礼会所营销培训课程':
                case '特色婚礼策划培训课程':
                    // labelClass='hlhsyxpxkc';
                    labelClass='tshlchpxkc';
                    break;
                case '婚礼花艺设计培训课程':
                    labelClass='hlhysjpxkc';
                    break;
                case '婚礼布展工程培训课程':
                    labelClass='hlbzgcpxkc';
                    break;
                case '婚礼主持进阶培训课程':
                    labelClass='hlzcjjpxkc';
                    break;
                case '婚礼音乐进阶培训课程':
                    labelClass='hlyyjjpxkc';
                    break;


                case '宴会设计进阶培训课程':
                    labelClass='yhsjjjpxkc';
                    break;
                case '婚礼策划全案解析课程':
                    labelClass='hlchqajxkc';
                    break;
                case '目的地婚礼资源对接会':
                    labelClass='mddhlzydjh';
                    break;

                case '婚庆道具采购狂欢节':
                    labelClass='hqdjcgkhj';
                    break;
                case '全球婚宴酒店总裁论坛':
                    labelClass='qqhyjdzclt';
                    break;

                case '婚嫁互联网营销峰会':
                    labelClass='hjhlwyxfh';

                    break;


                

            }
            let title=`
                    <div class="title">
                        <div class="title-text">
                            <div class="programs-label programs-label-${labelClass}">
                            
                            </div>
                      
                        </div>
                        <div class="area">
                            <i class="tri l"></i>
                            <div class="text">${n.place}</div>
                            <i class="tri r"></i>
                        </div>
                    </div>
                    <script >
                    // $('.programs-label-${labelClass}').css({
                    //  'margin-bottom':-$('.programs-label-${labelClass}').outerHeight()/2
                    // });
                    $('.programs-label-${labelClass}').parent().css({
                     'height':$('.programs-label-${labelClass}').outerHeight()/2
                    });
                    $('.programs-label-${labelClass}').css({
                     'margin-left':-$('.programs-label-${labelClass}').outerWidth()/2
                    });
                    
                    </script>
                    `;



            let listStr2=``;
            n.list.forEach((n2,i2)=>{

                if($.trim(n2.company_name)=='2016中国婚礼策划金熊奖评审委员会'){
                    n2.company_name='2016中国婚礼策划金熊奖<br>评审委员会'
                }
                if($.trim(n2.company_name)=='2016中国婚礼行业年度人物评审委员会'){
                    n2.company_name='2016中国婚礼行业年度人物<br>评审委员会'
                }

                if(n.list.length>4&&n.list.length%3==2){
                    if(i2==(n.list.length-1)){

                        var class2item='last rest-two';
                    }else{
                        var class2item='';
                    }
                }else if(n.list.length==7){
                    if(i2==(n.list.length-1)||i2==(n.list.length-3)){
                        var class2item='last rest-two'
                    }else{
                        var class2item=''
                    }

                }else{
                    if(n.list.length==4||n.list.length==2){
                        var class2item='contains-4item'
                    }else{
                        var class2item=''
                    }

                }


                listStr2+=`
                        <div class="item ${class2item} ${groupClass?groupClass:''} ${labelClass}"  >
                            <div class="avatar" >
                                <img class="img lazy" data-original="images/${avatarJson[n2.number]}?imageView2/2/w/160/h/160" >
                            </div>
                             <div class="guest-box">
                                ${n2.title?n2.title+' 丨 ':''}${n2.position}             
                            </div>
                            <div class="company_name">
                              ${n2.company_name}                      
                            </div>
                            <div class="times" >
                              ${n2.times}                      
                            </div>
                            
                            <div class="type">
                              ${n2.type}                      
                            </div>
                        </div>
                    `
            });


            let htmlStr2=`
                    <div class="list-box">
                        ${title}
                        <div class="item-list-box">
                         ${listStr2}
                        </div>
                       
                    </div>
                `;


            htmlStr=`
                ${htmlStr}
         
                ${htmlStr2}
            `
        });

        htmlStr=`
                ${htmlTitle}
                ${htmlStr}
            `

        return htmlStr;
    }

    function covert2HtmlCourse(data) {
        // console.log(data)

        var htmlStr=``;


        var htmlTitle=`<div class="time-box">/ ${data['title']} /</div>`;


        data.subject.forEach((n,i)=>{
            var labelClass='';
            switch (n.title){
                case '开幕式':
                    labelClass='kmzc';
                    break;


                case '高端宴会设计峰会':
                    labelClass='gdyhsjfh';
                    break;
                case '婚嫁企业总裁论坛':
                    labelClass='hjqyzclt';
                    break;
                case '婚嫁企业品牌营销峰会':
                    labelClass='hjqyppyxfh';
                    break;
                case '婚嫁企业运营管理峰会':
                    labelClass='hjqyyyglfh';
                    break;

                case '全球目的地婚礼论坛':
                    labelClass='qqmddhllt';
                    break;
                case '一站式婚礼堂总裁论坛':
                    labelClass='yzshltzclt';
                    break;
                case '婚礼花艺设计表演大赏':
                    labelClass='hlhysjbyds';
                    break;


                case '顶尖婚礼策划师高峰论坛':
                    labelClass='djhlchsgflt';

                    break;

                case '婚礼销售谈单培训课程':
                    labelClass='hlxstdpxkc';
                    break;
                case '婚企运营管理培训课程':
                    labelClass='hqyyglpxkc';
                    break;
                case '婚礼服务执行培训课程':
                    labelClass='hlfwzxpxkc';
                    break;
                case '婚礼策划设计培训课程':
                    labelClass='hlchsjpxkc';
                    break;
                case '婚礼灯光舞美培训课程':
                    labelClass='hldgwmpxkc';
                    break;
                case '婚礼会所营销培训课程':
                case '特色婚礼策划培训课程':
                    // labelClass='hlhsyxpxkc';
                    labelClass='tshlchpxkc';
                    break;
                case '婚礼花艺设计培训课程':
                    labelClass='hlhysjpxkc';
                    break;
                case '婚礼布展工程培训课程':
                    labelClass='hlbzgcpxkc';
                    break;
                case '婚礼主持进阶培训课程':
                    labelClass='hlzcjjpxkc';
                    break;
                case '婚礼音乐进阶培训课程':
                    labelClass='hlyyjjpxkc';
                    break;


                case '宴会设计进阶培训课程':
                    labelClass='yhsjjjpxkc';
                    break;
                case '婚礼策划全案解析课程':
                    labelClass='hlchqajxkc';
                    break;
                case '目的地婚礼资源对接会':
                    labelClass='mddhlzydjh';
                    break;

                case '婚庆道具采购狂欢节':
                    labelClass='hqdjcgkhj';
                    break;
                case '全球婚宴酒店总裁论坛':
                    labelClass='qqhyjdzclt';
                    break;




            }
            let title=`
                    <div class="title">
                        <div class="title-text">
                            <div class="programs-label programs-label-${labelClass}">
                            
                            </div>
                      
                        </div>
                      
                    </div>
                    <script >
                    // $('.programs-label-${labelClass}').css({
                    //  'margin-bottom':-$('.programs-label-${labelClass}').outerHeight()/2
                    // });
                    $('.programs-label-${labelClass}').parent().css({
                     'height':$('.programs-label-${labelClass}').outerHeight()/2
                    });
                    $('.programs-label-${labelClass}').css({
                     'margin-left':-$('.programs-label-${labelClass}').outerWidth()/2
                    });
                    
                    </script>
                    `;



            let listStr2=``;

            n.place.forEach((n2,i2)=>{


                let listTitleStr2=`
                          <div class="area">
                            <i class="tri l"></i>
                            <div class="text">${n2.title} <a class="link" href="/course" >在线选座</a></div>
                            
                            <i class="tri r"></i>
                           
                        </div>
                    `

                let listStr3=``;
                n2.list.forEach((n3,i3)=>{
                    listStr3+=`
                        <div class="item item--course" >
                            <div class="avatar" >
                                <img class="img lazy" data-original="images/${avatarJson[n3.number]}?imageView2/2/w/160/h/160" >
                            </div>
                             <div class="guest-box">
                                ${n3.title} 丨 ${n3.position}             
                            </div>
                            <div class="company_name">
                              ${n3.company_name}                      
                            </div>
                            <div class="times">
                              ${n3.times}                      
                            </div>
                            
                            <div class="type">
                              ${n3.type}                      
                            </div>
                        </div>
                    `
                })

                listStr2+=`
                        <div class="item-list-title-box">
                            ${listTitleStr2}
                        </div>

                        <div class="item-list-box">
                         ${listStr3}
                        </div>
                `;






            });


            let htmlStr2=`
                    <div class="list-box">
                        ${title}
                      
                        <div class="item-list-box-course">
                         ${listStr2}
                        </div>
                       
                    </div>
                `;


            htmlStr=`
                ${htmlStr}
         
                ${htmlStr2}
            `
        });

        htmlStr=`
                ${htmlTitle}
                ${htmlStr}
            `

        return htmlStr;
    }




    function covert2HtmlSecond(data) {
        // console.log(data)

        var htmlStr=``;


        var htmlTitle=`
<div class="title-box">
<div class="programs-label programs-label-2016zzhlchjxjxccs"></div>
</div>
 <script >
    $('.programs-label-2016zzhlchjxjxccs').parent().css({
     'height':$('.programs-label-2016zzhlchjxjxccs').outerHeight()/2
    });
    $('.programs-label-2016zzhlchjxjxccs').css({
     'margin-left':-$('.programs-label-2016zzhlchjxjxccs').outerWidth()/2
    });
    
    </script>
`;


        data.forEach((n,i)=>{
            let title=`
                    <div class="title">
                       
                        <div class="area">
                            <i class="tri l"></i>
                            <div class="text">${n.area}</div>
                            <i class="tri r"></i>
                        </div>
                    </div>
                  
                    `;
            let listStr2=``;
            n.list.forEach((n2,i2)=>{
                listStr2+=`
                        <div class="item" >
                             <div class="title-text">
                                <div class="programs-label programs-label-${n2.cname}">
                                </div>
                            </div>
                            <div class="place">
                              ${n2.place}                      
                            </div>
                            <div class="num">
                              ${n2.num}                      
                            </div>
                        </div>
                          <script >
           
                        $('.programs-label-${n2.cname}').parent().css({
                         'height':$('.programs-label-${n2.cname}').outerHeight()/2
                        });
                        $('.programs-label-${n2.cname}').css({
                         'margin-left':-$('.programs-label-${n2.cname}').outerWidth()/2
                        });
                        
                        </script>
                    `
            });

            let htmlStr2=`
                    <div class="list-box">
                        ${title}
                        <div class="item-list-box">
                         ${listStr2}
                        </div>
                       
                    </div>
                `;


            htmlStr=`
                ${htmlStr}
                ${htmlStr2}
            `
        });

        htmlStr=`${htmlTitle}${htmlStr}`
        return htmlStr;
    }


    function covert2HtmlSupplier(data) {
        // console.log(data);

        var htmlStr=``;


        data.forEach((n,i)=>{

            if(data.length%3==2){
                if(i==(data.length-1)){
                    var class2item='last rest-two';
                }else{
                    var class2item='';
                }
            }




            htmlStr+=`
                    <div class="item ${class2item}" >
                         <div class="img-box">
                            <img class="img lazy" data-original="${n.logo_url}?imageView2/1/w/160/h/160" >
                        </div>
                        <div class="title">
                          ${n.title}                      
                        </div>
                        <div class="cate">
                          ${n.cate}                      
                        </div>
                        <div class="sub_title">
                          <img class="img" src="images/2016WFCsupplier.png" alt="">                      
                        </div>
                    </div>
                    
                `
        });

        return htmlStr;
    }

    
    function generateGoldFirstRace() {
        return [
            {
                'area':'华东赛区',
                'list':[
                    {
                        'title':'华东赛区第一分赛区',
                        'cname':'hdsqd1fsq',
                        'place':'「会议厅A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第二分赛区',
                        'cname':'hdsqd2fsq',
                        'place':'「会议厅B」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第三分赛区',
                        'cname':'hdsqd3fsq',
                        'place':'「会议厅C」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第四分赛区',
                        'cname':'hdsqd4fsq',
                        'place':'「会议厅D」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第五分赛区',
                        'cname':'hdsqd5fsq',
                        'place':'「会议厅E」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第六分赛区',
                        'cname':'hdsqd6fsq',
                        'place':'「会议厅F」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                ],
            },
            {
                'area':'华南赛区',
                'list':[
                    {
                        'title':'华南赛区第一分赛区',
                        'cname':'hnsqd1fsq',
                        'place':'「会议厅G」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华南赛区第二分赛区',
                        'cname':'hnsqd2fsq',
                        'place':'「会议厅H」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                ],
            },
            {
                'area':'华中赛区',
                'list':[
                    {
                        'title':'华中赛区第一分赛区',
                        'cname':'hzsqd1fsq',
                        'place':'「会议厅I」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华中赛区第二分赛区',
                        'cname':'hzsqd2fsq',
                        'place':'「会议厅J」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华中赛区第三分赛区',
                        'cname':'hzsqd3fsq',
                        'place':'「会议厅K」',
                        'num':'15 家晋级初赛婚礼公司',
                    },

                ],
            },
            {
                'area':'华北赛区',
                'list':[
                    {
                        'title':'华北赛区第一分赛区',
                        'cname':'hbsqd1fsq',
                        'place':'「会议厅L」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华北赛区第二分赛区',
                        'cname':'hbsqd2fsq',
                        'place':'「会议厅M」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华北赛区第三分赛区',
                        'cname':'hbsqd3fsq',
                        'place':'「会议厅N」',
                        'num':'15 家晋级初赛婚礼公司',
                    },

                ],
            },
            {
                'area':'东北赛区',
                'list':[
                    {
                        'title':'东北赛区第一分赛区',
                        'cname':'dbsqd1fsq',
                        'place':'「会议厅O」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'东北赛区第二分赛区',
                        'cname':'dbsqd2fsq',
                        'place':'「会议厅P」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                ],
            },
            {
                'area':'西北赛区',
                'list':[
                    {
                        'title':'西北赛区第一分赛区',
                        'cname':'xbsqd1fsq',
                        'place':'「会议厅Q」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西北赛区第二分赛区',
                        'cname':'xbsqd2fsq',
                        'place':'「会议厅R」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西北赛区第三分赛区',
                        'cname':'xbsqd3fsq',
                        'place':'「会议厅S」',
                        'num':'15 家晋级初赛婚礼公司',
                    },

                ],
            },
            {
                'area':'西南赛区',
                'list':[
                    {
                        'title':'西南赛区第一分赛区',
                        'cname':'xnsqd1fsq',
                        'place':'「会议厅T」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西南赛区第二分赛区',
                        'cname':'xnsqd2fsq',
                        'place':'「会议厅U」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西南赛区第三分赛区',
                        'cname':'xnsqd3fsq',
                        'place':'「会议厅V」',
                        'num':'15 家晋级初赛婚礼公司',
                    },

                ],
            },
        ]


    }




    return{
        init:init,
    }

}());