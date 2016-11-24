app.index=(function(){
    "use strict";
    var avatarJson;
    function init(){
        avatarJson=window.avatarJson;
        render();
    }

    function render() {
        var appData=window.appData;

        // console.log(appData);
        var timeBreak1=new Date('2016/08/17 12:00:00').getTime();
        var timeBreak2=new Date('2016/08/17 17:00:00').getTime();
        var timeBreak3=new Date('2016/08/18 12:00:00').getTime();
        var timeBreak4=new Date('2016/08/18 17:00:00').getTime();

        var course17am=appData.course.filter((n,i)=>{
            if(n.start_time=="09:00"&&n.date=="08月17日"){
                return n;
            }
        });

        var course17pm=appData.course.filter((n,i)=>{
            if(n.start_time=="14:00"&&n.date=="08月17日"){
                return n;
            }
        });

        var course18am=appData.course.filter((n,i)=>{
            if(n.start_time=="09:00"&&n.date=="08月18日"){
                return n;
            }
        });

        var course18pm=appData.course.filter((n,i)=>{
            if(n.start_time=="14:00"&&n.date=="08月18日"){
                return n;
            }
        });



        // console.log(course18am);

        var course17amHtml=covert2Html(course17am);
        var course17pmHtml=covert2Html(course17pm);
        var course18amHtml=covert2Html(course18am);
        var course18pmHtml=covert2Html(course18pm);
        var now=new Date();







        // $("#course-list-head .item").on('click',function () {
            // $("#course-list-head .item").removeClass('active');
            // $(this).addClass('active');
            // var span=$(this).data('span');
            // switch (span){
            //     case 'am817':
            //         $("#course-list-content").empty().append(course17amHtml);
            //         if(now>timeBreak1){
            //             $("#course-list-content a").on('click',function () {
            //                 return false;
            //             });
            //         }
            //         break;
            //     case 'pm817':
            //         $("#course-list-content").empty().append(course17pmHtml);
            //         if(now>timeBreak2){
            //             $("#course-list-content a").on('click',function () {
            //                 return false;
            //             });
            //         }
            //         break;
            //     case 'am818':
            //         $("#course-list-content").empty().append(course18amHtml);
            //         if(now>timeBreak3){
            //             $("#course-list-content a").on('click',function () {
            //                 return false;
            //             });
            //         }
            //         break;
            //     case 'pm818':
            //         $("#course-list-content").empty().append(course18pmHtml);
            //         if(now>timeBreak4){
            //             $("#course-list-content a").on('click',function () {
            //                 return false;
            //             });
            //         }
            //         break;
            // }



        // });



        $(window).on('hashchange load',function () {
            var hashStr=hb.location.url('hash');
            // console.log(hashStr)
            if(hashStr){
                $("#course-list-head .item").removeClass('active');
                var span=hashStr;

                $(`[data-span='${hashStr}']`).addClass('active');

                switch (span){
                    case 'am817':
                        $("#course-list-content").empty().append(course17amHtml);
                        if(now>timeBreak1){
                            $("#course-list-content a").on('click',function () {
                                return false;
                            });
                        }
                        break;
                    case 'pm817':
                        $("#course-list-content").empty().append(course17pmHtml);
                        if(now>timeBreak2){
                            $("#course-list-content a").on('click',function () {
                                return false;
                            });
                        }
                        break;
                    case 'am818':
                        $("#course-list-content").empty().append(course18amHtml);
                        if(now>timeBreak3){
                            $("#course-list-content a").on('click',function () {
                                return false;
                            });
                        }
                        break;
                    case 'pm818':
                        $("#course-list-content").empty().append(course18pmHtml);
                        if(now>timeBreak4){
                            $("#course-list-content a").on('click',function () {
                                return false;
                            });
                        }
                        break;
                }
            }else{
                switch (true){
                    case now<timeBreak1:
                        // $("#course-list-head .item:first-child").addClass('active');
                        // $("#course-list-content").empty().append(course17amHtml);
                        window.location.hash='am817';
                        break;
                    case now<timeBreak2:
                        // $("#course-list-head .item:first-child+.item").addClass('active');
                        // $("#course-list-content").empty().append(course17pmHtml);
                        window.location.hash='pm817';
                        break;
                    case now<timeBreak3:
                        // $("#course-list-head .item:first-child+.item+.item").addClass('active');
                        // $("#course-list-content").empty().append(course18amHtml);
                        window.location.hash='am818';
                        break;
                    case now<timeBreak4:
                        // $("#course-list-head .item:first-child+.item+.item+.item").addClass('active');
                        // $("#course-list-content").empty().append(course18pmHtml);
                        window.location.hash='pm818';
                        break;
                    default:
                        // $("#course-list-head .item:first-child+.item+.item+.item").addClass('active');
                        // $("#course-list-content").empty().append(course18pmHtml);
                        $("#course-list-content a").on('click',function () {
                            return false;
                        });
                        window.location.hash='pm818';

                }
            }



        });



        function covert2Html(arr) {
            var newArr=cateByName(arr,'headline');
            // console.log(newArr)
            var htmlStr=``;
            newArr.forEach((n,i)=>{
                let title=`
                    <div class="title">
                        <div class="line l"></div>
                        <div class="text">${n['headline']}</div>
                        <div class="line r"></div>
                    </div>
                    `;
                let listStr2=``;
                n.list.forEach((n2,i2)=>{
                    n2.title=$.trim(n2.title);
                    if(n2.title.length==2){
                        let str=n2.title.split('');
                        n2.title=`${str[0]}<span class="gap-1">${str[1]}</span>`
                    }
                    listStr2+=`
                        <a class="item"  href="/course/detail?id=${n2.id}" >
                            <div class="content-1">
                                <img class="avatar" src="images/${avatarJson[n2.number]}?imageView2/2/w/100/h/100" >
                                <div class="info-box">
                                    <div class="company_name">
                                      ${n2.company_name}                      
                                    </div>
                                    <div class="guest-box">
                                        ${n2.title} 丨 ${n2.position}             
                                    </div>
                                </div>
                               <div class="hall">
                                    会议厅${n2.meetingplace}
                                </div>
                            </div>
                            <div class="content-2">
                                <div class="course-label">3小时专业课程</div>
                                <div class="seat-left">
                                <i class="seat"></i>
                                <span>还剩${n2.num}</span>
                                </div>
                            </div>
                        </a>
                    `
                });

                let htmlStr2=`
                    <div class="headline-box">
                        ${title}
                        <div class="item-list-box">
                         ${listStr2}
                        </div>
                       
                    </div>
                `


                htmlStr+=htmlStr2
            });
            return htmlStr;
        }

        function cateByName(arr,name) {
            var newArr=[];
            var names=getNames(arr,name);
            // console.log(names)
            newArr=names.map((n,i)=>{
                let obj={};
                obj[name]=n;
                obj['list']=[];
                return obj;
            });

            arr.forEach((n,i)=>{
                newArr.forEach((n2,i2)=>{
                    if(n[name]==n2[name]){
                        n2['list'].push(n);
                    }

                });

            });
            return newArr
        }

        function getNames(arr,name) {
            // console.log(arr,name)
            var newArr=[];
            var names=arr.map((n,i)=>{
                return n[name];
            });
            return unique(names);
        }

        function unique(arr) {
            var result = [], hash = {};
            for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        }




    }

    return{
        init:init,
    }
}());