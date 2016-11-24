app.index=(function(){
    var avatarJson;
    function init(){
        avatarJson=window.avatarJson;
        render();
        initSwiper();
    }

    function render() {
        console.log(window.appData)
        var am816=window.appData.am816;
        var pm816=window.appData.pm816;
        var goldFirstRace=generateGoldFirstRace();
        var am817=window.appData.am817;
        var pm817=window.appData.pm817;
        var course817=window.appData.course817;
        var course818=window.appData.course818;
        var supplier=window.appData.supplier;


        $("#am816").append(covert2Html(am816))
        $("#pm816").append(covert2Html(pm816))
        $("#gold-first-race").append(covert2HtmlSecond(goldFirstRace))
        $("#am817").append(covert2Html(am817))
        $("#pm817").append(covert2Html(pm817))
        $("#course817").append(covert2Html(course817))
        $("#course818").append(covert2Html(course818))
        $("#supplier-list-box").append(covert2HtmlSupplier(supplier))



    }
    function initSwiper() {
        var swiper = new Swiper('#my-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });



    }




    function covert2Html(data) {
        console.log(data)

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
                    labelClass='hlhsyxpxkc';
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
                listStr2+=`
                        <div class="item" >
                            <img class="avatar" src="images/${avatarJson[n2.number]}?imageView2/2/w/160/h/160" >
                             <div class="guest-box">
                                ${n2.title} 丨 ${n2.position}             
                            </div>
                            <div class="company_name">
                              ${n2.company_name}                      
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

    function covert2HtmlSecond(data) {
        console.log(data)

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
        console.log(data);

        var htmlStr=``;


        data.forEach((n,i)=>{
            htmlStr+=`
                    <div class="item" >
                         <div class="img-box">
                            <img class="img" src="${n.logo_url}?imageView2/1/w/160/h/160" >
                        </div>
                        <div class="title">
                          ${n.title}                      
                        </div>
                        <div class="cate">
                          ${n.cate}                      
                        </div>
                        <div class="sub_title">
                          ${n.sub_title}                      
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第二分赛区',
                        'cname':'hdsqd2fsq',
                        'place':'「分会场B」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第三分赛区',
                        'cname':'hdsqd3fsq',
                        'place':'「分会场C」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第四分赛区',
                        'cname':'hdsqd4fsq',
                        'place':'「分会场D」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第五分赛区',
                        'cname':'hdsqd5fsq',
                        'place':'「分会场E」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华东赛区第六分赛区',
                        'cname':'hdsqd6fsq',
                        'place':'「分会场F」',
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华南赛区第二分赛区',
                        'cname':'hnsqd2fsq',
                        'place':'「分会场B」',
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华中赛区第二分赛区',
                        'cname':'hzsqd2fsq',
                        'place':'「分会场B」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华中赛区第三分赛区',
                        'cname':'hzsqd3fsq',
                        'place':'「分会场C」',
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华北赛区第二分赛区',
                        'cname':'hbsqd2fsq',
                        'place':'「分会场B」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'华北赛区第三分赛区',
                        'cname':'hbsqd3fsq',
                        'place':'「分会场C」',
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'东北赛区第二分赛区',
                        'cname':'dbsqd2fsq',
                        'place':'「分会场B」',
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西北赛区第二分赛区',
                        'cname':'xbsqd2fsq',
                        'place':'「分会场B」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西北赛区第三分赛区',
                        'cname':'xbsqd3fsq',
                        'place':'「分会场C」',
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
                        'place':'「分会场A」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西南赛区第二分赛区',
                        'cname':'xnsqd2fsq',
                        'place':'「分会场B」',
                        'num':'15 家晋级初赛婚礼公司',
                    },
                    {
                        'title':'西南赛区第三分赛区',
                        'cname':'xnsqd3fsq',
                        'place':'「分会场C」',
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