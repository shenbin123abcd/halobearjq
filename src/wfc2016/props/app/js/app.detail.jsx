;app.detail=(function(){
    "use strict";
    function init(id){
        ReactDOM.render(
            <SeatBox  data={window.appData}   />,
            document.querySelector(id)
        );
    }
    
    var position={
        left:0,
        top:0,
        scale:1
    };
    var tmpSeat=null;
    var avatarJson=window.avatarJson;
    var SeatBox = React.createClass({
        getInitialState: function() {
            var data=window.appData;

            console.log(data);
            var aSeatArr=[];
            data.seats.forEach((n,i)=>{
                n.forEach((n,i)=>{
                    if(!n.user){
                        aSeatArr.push(n.seat_no)
                    }
                });
            });

            data.course.restNum=aSeatArr.length

            return {
                data: data,
                data2: [],
                aSeatArr: aSeatArr,
            };
        },
        // componentDidMount: function() {
        //     console.log('父组件：异步获取数据前 ReactDOM.findDOMNode(this)',ReactDOM.findDOMNode(this))
        //     $.ajax({
        //         url: this.props.url,
        //         dataType: 'json',
        //         cache: false,
        //         success: function(data) {
        //             //console.log('父组件：异步获取数据 ReactDOM.findDOMNode(this)',ReactDOM.findDOMNode(this))
        //
        //             this.setState({data: data.sections[0].seatRows});
        //         }.bind(this),
        //         error: function(xhr, status, err) {
        //             console.error(this.props.url, status, err.toString());
        //         }.bind(this)
        //     });
        // },
        handleCommentSubmit: function(comment) {
            //console.log(comment)
            // TODO: submit to the server and refresh the list
            // this.setState({data: []});
        },
        handleCancel: function(comment) {
            this.setState({data2: []});

        },
        handleSelectRandom: function() {

            // function rnd(min,max){
            //     var tmp=min;
            //     if(max<min){
            //         min=max;
            //         max=tmp;
            //     }
            //     return Math.floor(Math.random()*(max-min+1)+min);
            // }

            if(this.state.aSeatArr.length==0){
                hb.lib.weui.alert('所有位子已被预定');
                return;
            }

            var num=getRandomInt(0,this.state.aSeatArr.length);

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var sear_no=this.state.aSeatArr[num];
            // console.log(this.state.aSeatArr);
            // console.log(num,sear_no);
            // console.log([].concat(sear_no));

            this.setState({data2: [].concat(sear_no)});
        },
        handleOnSeatActive:function(data){
            var oDate = this.state.data2;
            // console.log(data);
            //console.log(this);
            // this.setState({data2: newArr});

            if(oDate.length==0){
                var newArr = oDate.concat([data]);
                this.setState({data2: newArr});
            }else{
                if(oDate.length==1){
                    if(data==oDate[0]){
                        var newArr = [];
                        this.setState({data2: newArr});
                    }else{
                        hb.lib.weui.alert('不要贪心，一次只能选一个座位哦~');
                    }
                }

            }


        },
        render: function() {
            return (
                <div className="seat-wrapper">
                    <GuestInfo data={this.state.data.course}></GuestInfo>
                    <SeatList onSeatActive={this.handleOnSeatActive} data={this.state.data.seats} selectedSeats={this.state.data2} />
                    <SeatForm onCommentSubmit={this.handleCommentSubmit} onCancelSeat={this.handleCancel} onSelectRandom={this.handleSelectRandom} data={this.state.data2} courseData={this.state.data.course}/>
                </div>
            );
        }
    });

    var GuestInfo = React.createClass({
        getInitialState: function() {
            return {
                author: '',
                text: '',
            };
        },

        render: function() {


            return (
                <div className="header-wrapper">
                    <div className="guest-info-wrapper" >
                        <img className="avatar" src={`images/${avatarJson[this.props.data.number]}`} alt=""/>
                        <div className="info">
                            <div className="title">{this.props.data.company}</div>
                            <div className="des">{this.props.data.place} | 仅剩{this.props.data.restNum}席位</div>
                        </div>
                    </div>
                    <div className="state-info-wrapper-line"></div>
                    <div className="state-info-wrapper" >
                        <div className="state state-a">
                            <i className="i i-a"></i>
                            <span className="t">可选</span>
                        </div>
                        <div className="state state-o">
                            <i className="i i-o"></i>
                            <span className="t">已定</span>
                        </div>
                        <div className="state state-s">
                            <i className="i i-s"></i>
                            <span className="t">已选</span>
                        </div>
                    </div>
                </div>
            );
        }
    });



    var SeatList = React.createClass({
        getInitialState: function() {
            return {
                hbDrag: '',
                selectedSeats: [],
            };
        },
        componentDidMount:function(){
            //console.log(this);
            //console.log('子组件 ReactDOM.findDOMNode(this)',ReactDOM.findDOMNode(this));
            //var $checkboxContainer = $(this.refs.checkboxContainer.getDOMNode());
            //console.log('子组件 refs.checkboxContainer.getDOMNode()',this.refs.checkboxContainer);
            var _this=this;
            this.state.hbDrag=hb.drag(this.refs.dragContainer,{
                minScale:0.2,
                onPinchMove:function (p) {
                    position=p;
                    // $(_this.refs.ruler).css({
                    //     transform: `scale3d(${scale},${scale},${scale})`,
                    // });
                },
                onPinchEnd:function (p) {
                    position=p;
                },
                onPanMove:function (p) {
                    position=p;
                },
                onPanEnd:function (p) {
                    position=p;
                },
            })
            // console.log(document.documentElement.style.fontSize)
            var rtSize=document.documentElement.style.fontSize.replace("px","");
            var tl=6.53*rtSize*2;
            var tt=5.00*rtSize*2;

            this.state.hbDrag.move(-tl,-tt);
            // this.state.hbDrag.scale(0.5);
            
            // this.state.hbDrag.move(-tl-1,-tt-1);
        },
        componentDidUpdate: function() {
            // console.log('子组件 componentDidUpdate ReactDOM.findDOMNode(this)',ReactDOM.findDOMNode(this));
            // //jquery插件
            // if(!this.state.hbDrag){
            //     this.state.hbDrag=hb.drag(this.refs.checkboxContainer,{})
            // }
            // console.log(this.props.selectedSeats);
            // this.setState({selectedSeats: this.props.selectedSeats});

        },
        componentWillReceiveProps : function(nextProps) {
            // console.log(nextProps)

        },
        handleOnSeatActive:function(data){
            //console.log(data);
            //console.log(this);
            this.props.onSeatActive(data);
        },

        render: function() {
            // console.log(this.props.selectedSeats)
            if(this.props.data){
                var seatListNodes = this.props.data.map((n,i) =>{
                    // if(this.props.selectedSeats[0].split(',')[0]==i){
                    //     var isSelected=true;
                    // }
                    return (
                        <SeatRow onSeatActive={this.handleOnSeatActive} selectedSeats={this.props.selectedSeats}  data={n} key={i} >

                        </SeatRow>
                    );
                });
            }

            var col = this.props.data.map((n,i) =>{
                return (
                    <div className="col" key={i}>{i+1}</div>
                );
            });
            var row = this.props.data[0].map((n,i) =>{
                return (
                    <div className="ruler-horizontal" key={i}>{i+1}</div>
                );
            });

            return (
                <div className="seat-list-box">
                    <div className="seat-list" ref="dragContainer">
                        <div className="top-gap"></div>
                        <div className="top-line"></div>
                        <div className="sign">投影幕布</div>
                        <div className="disk"></div>
                        <div className="ruler"  ref="ruler">{col}</div>
                        <div className="ruler right"  ref="ruler">{col}</div>
                        <div className="ruler-horizontal-box"  ref="ruler-horizontal">{row}</div>
                        <div className="seat-array">
                            {seatListNodes}
                        </div>
                    </div>

                </div>
            );
        }
    });


    var SeatRow = React.createClass({
        handleOnSeatActive:function(data){
            this.props.onSeatActive(data);
        },

        render: function() {
            //console.log(this);
            // console.log(this.props.selectedSeats)

            var seatNodes = this.props.data.map((n,i)=> {


                return (
                    <SeatCell onSeatActive={this.handleOnSeatActive} selectedSeats={this.props.selectedSeats} data={n} index={i}  key={i} >
                    </SeatCell>
                );
            });


            return (
                <div className="seat-row clearfix">
                    {seatNodes}
                </div>
            );
        }
    });

    var SeatCell = React.createClass({
        getInitialState: function() {
            return {
                active: false,
                seat: '',
            };
        },
        handleClick: function(e) {
            var _this=this;
            if(!appData.is_complete){
                common.util.alert_goBuyTicket();
                return
            }
            if(appData.is_selected){
                hb.lib.weui.alert('您已经选过座位了');
                return
            }

            if(tmpSeat){
                $(tmpSeat).tooltip('hide')
                tmpSeat=null;
            }
            if(this.props.data.user){
                hb.lib.weui.loading.show();
                $.ajax({
                    method: "GET",
                    url: "/course/getSeatInfo",
                    data: {
                        user:this.props.data.user,
                        id:hb.location.url('?id'),
                        // user:27,
                    },
                    success: function(res, textStatus, errorThrown) {
                        hb.lib.weui.loading.hide();
                        if(res.status==1){
                            var arr=_this.props.data.seat_no.split(',');
                            var text=arr[0]+'排'+arr[1]+'座';
                            hb.lib.weui.alert({
                                title:'提示',
                                content:`<div class="bubble-alert-wrapper">
                                    <div class="seat-no">‘${text}‘已被预订</div>
                                    <div class="bubble-title"></div>
                                     <div class="bubble-content">
                                          <div>${res.data.province_title} | ${res.data.company_name}</div>
                                          <div>${res.data.name}</div>
                                         </div>
                                     </div>`,
                                btn:'确定',
                            });


                            //     tmpSeat=_this.refs.seatDom;
                            //
                            //     $(_this.refs.seatDom).tooltip({
                            //         template:`<div class="tooltip" role="tooltip">
                            //                        <div class="tooltip-arrow">
                            //                        </div>
                            //                        <div class="bubble-wrapper">
                            //                        <div class="bubble-title">${res.data.position}</div>
                            //                             <div class="bubble-content">
                            //                              <div>${res.data.name} | ${res.data.city_title}</div>
                            //                              <div class="seat-no">${text}</div>
                            //                             </div>
                            //                         </div>
                            //                     </div>`,
                            //         trigger:'',
                            //         title:' ',
                            //         container:_this.refs.seatDom
                            //     });
                            //     $(_this.refs.seatDom).tooltip('show');
                            //
                            //     var lStr=$(_this.refs.seatDom).children('.tooltip').css('left');
                            //     var l=lStr.replace('px','')*position.scale;
                            //
                            //     var tStr=$(_this.refs.seatDom).children('.tooltip').css('top');
                            //     var t=tStr.replace('px','')*position.scale;
                            //
                            //     $(_this.refs.seatDom).children('.tooltip').css({
                            //         left:l,
                            //         top:t,
                            //         transform: `scale3d(${position.scale},${position.scale},${position.scale})`,
                            //     });

                        }else{
                            hb.lib.weui.loading.hide();
                            hb.lib.weui.alert(res.info);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        hb.lib.weui.loading.hide();
                        hb.lib.weui.alert('网络繁忙请稍候再试');

                    }
                });
            }else{
                this.props.onSeatActive(this.props.data.seat_no);
            }
        },
        componentDidMount:function(){
            // this.setState({active: true});

            // console.log(this.props.selectedSeats,this.props.data.seat_no)
        },
        componentWillReceiveProps : function(nextProps) {
            // console.log(nextProps.selectedSeats[0],this.props.data.seat_no)
            if(nextProps.selectedSeats.length>0){
                if(nextProps.selectedSeats[0]==this.props.data.seat_no){
                    this.setState({active: true});
                }
            }else{
                this.setState({active: false});
            }
            // if(this.props.selectedSeats[0]==this.props.data.seat_no){
            //     this.setState({active: true});
            // }


        },
        render: function() {
            // console.log(this.props.selectedSeats)
            var btnClass = classNames({
                'seat-cell s-a': true,
                'seat-cell s-o': this.props.data.user!=0,
                'seat-cell s-s': this.state.active,
            });



            return (
                <div className={btnClass} ref="seatDom" onClick={this.handleClick} >

                </div>
            );
        }
    });


    var SeatForm = React.createClass({
        getInitialState: function() {
            return {seat_no: '', id: ''};
        },
        handleSubmit: function(e) {
            e.preventDefault();
            var _this=this;
            var htmlStr=`
            <div id="go-pay" class="go-pay-spree" style="display: none;">
                <div class="bg"></div>
                <div class="dialog">
                    <div class="coin"></div>
                    <div class="text">
                    <div class="title">峰会期间只能预约一场婚庆道具采购狂欢节</div>
                    <div class="content">
                        确定预约 ${appData.course.company} 采购狂欢节<br>
                        ${appData.course.time} ${appData.course.place} 
                    </div>
                        
                    </div>
                    <div class="bt-box" >
                        <button class="uc-bt uc-bt-main pay"  id="go-pay-bt" ><img class="bt-img" src="images/bt-text-confirm.png" ></button>
                    </div>
            
                </div>
            </div>
            `;
            $('body').append(htmlStr);
            $("#go-pay").show();
            $("html,body").css({
                height:"100%",
                overflow:"hidden"
            })

            $("#go-pay .bg").on('click',function () {
                $("#go-pay").remove();
                $("html,body").css({
                    height:"",
                    overflow:""
                })
            });
            $("#go-pay-bt").on('click',function () {
                hb.lib.weui.loading.show();
                $.ajax({
                    method: "POST",
                    url: "/props/reserve",
                    data: {
                        seat_no:_this.props.data[0],
                        id:hb.location.url('?id'),
                    },
                    success: function(res, textStatus, errorThrown) {
                        if(res.status==1){
                            hb.lib.weui.loading.hide();
                            var id=hb.Cookies.get('wechat_ticket_id');
                            window.appData.share = {
                                link: 'http://wfc.halobear.com/course/my?id='+id,
                            };
                            app.wechat.init();

                            showShare();

                        }else{
                            hb.lib.weui.loading.hide();
                            hb.lib.weui.alert(res.info).then(function () {
                                if(res.info=='该座位已经被选了'){
                                    window.location.reload();
                                }
                            });
                        }
                        function showShare() {
                            document.title='大咖课程选座'
                            $("html,body").css({
                                height:"100%",
                                overflow:"hidden"
                            })
                            var successStr=`
                                <div id="go-book-success" class="go-book-success" >
                                    <div class="img-box">
                                        <img class="img" src="images/course-book-sucess.png" >
                                    </div>
                                    <div class="text-box">
                                      恭喜您，您已预约  ${appData.course.company} 采购狂欢节<br>
                                        ${appData.course.time} ${appData.course.place} 
                                    </div>
                                    
                                    <div class="bt-box" >
                                        <a href="/course/my" class="uc-bt uc-bt-main my-course"  ><img class="bt-img" src="images/bt-text-my-course.png" ></a>
                                    </div>
                                    
                                  
                                </div>`;
                            $('body').append(successStr);
                            // $("#share-this-course").on('click',function () {
                            //     app.common.guideShare.show();
                            // })

                        }


                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        hb.lib.weui.loading.hide();
                        hb.lib.weui.alert('网络繁忙请稍候再试');

                    }
                })
            });


        },
        handleCancel: function(e) {
            this.props.onCancelSeat();
        },
        handleSelectRandom: function(e) {
            this.props.onSelectRandom();
        },
        render: function() {
            // console.log(this.props.data)
            if(this.props.data.length){
                var seatNodes = this.props.data.map((n,i)=> {
                    var arr=n.split(',');
                    var text=arr[0]+'排'+arr[1]+'座';
                    return (
                        <div className="btn btn-color-third seat-num" onClick={this.handleCancel} key={n}>
                            <span>{text}</span> <i className="haloIcon haloIcon-times"></i>
                        </div>
                    );
                });

                var seatBox= <div className="selected-seat-box">
                    <div class="text">已选座位：</div>
                    {seatNodes}
                </div>;
                var button = <button className="btn btn-color-second" onClick={this.handleSubmit} type="button">确认选座</button>;

            }else{
                var seatBox= <div  className="selected-seat-box">
                    <div className="text">查看系统为您挑选的最佳位置</div>
                    <button className="btn btn-color-third" onClick={this.handleSelectRandom}>系统选座</button>

                </div>;
                var button = <button className="btn btn-color-second" disabled="disabled" type="button">确认选座</button>;
            }


            return (
                <div className="book-wrapper" >
                    {seatBox}
                    <div className="dash"></div>
                    <div className="info-box">
                        <div class="info-inner">
                            <div className="title">{this.props.courseData.company}采购狂欢节</div>
                            <div className="time">
                                2016年08月18日 {this.props.courseData.time}
                                {this.props.courseData.place}
                            </div>
                        </div>
                        {button}
                    </div>

                </div>
            );
        }
    });





    return{
        init:init,
    }
}());


