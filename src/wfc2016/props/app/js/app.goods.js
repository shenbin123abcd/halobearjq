

;app.goods=(function(){
    "use strict";
    function init(){
        initNg();
        bootstrapNg();
    }


    function initNg(){
        //console.log(angular)
        angular.module('halo', [
            'ngResource',
            'ngAnimate',
            'ngTouch',
            'ngSanitize',
        ]).controller('mainCtrl', ['$rootScope','$scope', '$timeout',
            function($rootScope,$scope, $timeout) {
                $scope.vm={};
                var vm=$scope.vm;
                var appData=window.appData;


                vm.data=appData.data;
                vm.is_address=appData.is_address;
                vm.selectedSpecs=_.map(vm.data.specs,function(n,i){
                    return null;
                });
                //console.log(vm.selectedSpecs)
                //console.log(vm.selectedSpecs);
                //console.log(vm.data);

                vm.selectSpec=function(item,index){
                    vm.selectedSpecs[index]=item;
                    //console.log(vm.selectedSpecs)
                    //console.log(_.some(vm.selectedSpecs, null))
                    if(_.includes(vm.selectedSpecs, null)){

                    }else{

                        let specs_key_arr=_.map(vm.selectedSpecs,function(n,i){
                            return n.spec_id+':'+n.id;
                        });
                        //console.log(specs_key_arr)

                        let specs_key=';'+specs_key_arr.join(';')+';';
                        //console.log(appData.data.sku,specs_key);

                        vm.selectedSku=_.find(appData.data.sku,{specs_key:specs_key})
                    }
                };

                vm.submit=function(){
                    if(window.appData.is_address==0){
                        hb.util.loading.show();
                        app.service.addAddress({
                            'name':$.trim($("#name").val()),
                            'phone':$("#phone").val(),
                            'province':$('#province').val(),
                            'city':$('#city').val(),
                            'region':$('#region').val(),
                            'address':$.trim($("#address").val()),
                        }).then(function(res){
                            hb.util.loading.hide();
                            hb.lib.weui.alert('添加地址成功').then((res)=>{
                                payMoney();
                            });
                        },function(res){
                            hb.util.loading.hide();
                            hb.lib.weui.alert({
                                title:'温馨提示',
                                content:res,
                                btn:'确定',
                            })
                        })
                    }else{
                        payMoney();
                    }
                };

                function payMoney(){
                    //generateSkuName(vm.selectedSpecs);
                    var data={
                        product_id: vm.selectedSku.product_id,
                        id:window.appData.data.id,
                        num:vm.purchaseNumber,
                        spec:generateSkuName(vm.selectedSpecs),
                    };
                    var name='product-id-'+data.product_id+'-num-'+data.num;
                    app.pay2.callPay(name).callpay({
                        data:data,
                        onSuccess:function (res) {
                            hb.lib.weui.alert('支付成功').then((res)=>{
                                window.location.href='/uc/caseRecord'
                            });
                        },
                        onFail:function (res) {
                            hb.lib.weui.alert(res);
                        },
                    });
                }



                function init(){
                    makeCName();
                    //makeCSkuName();
                    calPriceRange();
                }

                function generateSkuName(selectedSpecs){
                    //console.log(selectedSpecs)
                    if(selectedSpecs.length==0){
                        return '';
                    }else{
                        let specs_name_arr=_.map(selectedSpecs,'name');
                        //console.log(specs_key_arr)
                        let specs_name=specs_name_arr.join(',');
                        return specs_name;
                    }
                }

                function makeCSkuName(){
                    //var appData=window.appData;
                    //if(appData.data.specs.length==0){
                    //    return;
                    //}
                    //_.forEach(appData.data.sku, function(n, i) {
                    //    //console.log(n.specs_key);
                    //
                    //    var specArrStr=_.trim(n.specs_key.replace(/;/g,' ')).split(' ');
                    //    var specArr=_.map(specArrStr,function(n,i){
                    //        return n.split(':')
                    //    });
                    //
                    //
                    //    console.log(specArr);
                    //    var idArr=_.trim(n.specs_key.replace(/;/g,' ')).split(' ');
                    //
                    //    //console.log(idArr);
                    //    var spec=_.find(appData.data.specs, { 'id': idArr[0] });
                    //    n.c_name=_.find(spec.value, { 'id': idArr[1]}).name;
                    //    //console.log(n.c_name);
                    //});
                }

                function makeCName(){
                    var appData=window.appData;
                    var nameArr=appData.data.name.split('丨');
                    vm.data.c_company_name=nameArr[0];
                    vm.data.c_name=nameArr[1];
                }


                function calPriceRange(){
                    var appData=window.appData;
                    var sell_price_list=_.map(appData.data.sku, function(n,i){
                        //console.log(n.sell_price)
                        //console.log(parseFloat('1.01'))
                        return parseFloat(n.sell_price);

                    });

                    //console.log(sell_price_list)

                    if(sell_price_list.length==1){
                        vm.selectedSku=appData.data.sku[0]
                    }else{
                        let max=_.max(sell_price_list);
                        let min=_.min(sell_price_list);
                        if(max==min){
                            vm.data.c_sell_price_range=max.toFixed(2);

                        }else{
                            vm.data.c_sell_price_range=min.toFixed(2)+'-'+max.toFixed(2);
                        }
                    }


                    //console.log(vm.data.c_sell_price_range)
                }


                init()
            }])
            .directive('myAddress', [function(){
                var linkFunction=function($scope, $element, $attrs){
                    var vm;
                    $scope.vm=vm={};
                    var htmlStr=`
              <div class="address-box">
                  <div class="item-list-box">
                                    <div class="item">
                        <div class="title">收件人名</div>
                        <div class="content">
                            <input class="control" id="name" type="text" placeholder="请输入收件人姓名">
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">手机号码</div>
                        <div class="content">
                            <input class="control" id="phone" type="number" placeholder="请输入手机号">
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">所在省份</div>
                        <div class="content">
                            <select app-region-select-level3="1" data-for="address" id="province"  class="control" >
                                <option value="">请选择省份</option>
                            </select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">所在城市</div>
                        <div class="content">
                             <select app-region-select-level3="2" data-for="address" id="city" class="control" >
                                <option value="">请选择城市</option>
                            </select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">所在区县</div>
                        <div class="content">
                             <select app-region-select-level3="3" data-for="address" id="region" class="control" >
                                <option value="">请选择区县</option>
                            </select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">详细地址</div>
                        <div class="content">
                            <input class="control" id="address" type="text" placeholder="街道编号、名称，楼宇地址">
                        </div>
                    </div>
                  </div>
              </div>
            `;
                    $element.append(htmlStr);
                    app.regionSelect.init();
                    //initSubmit();

                };
                return{
                    restrict: 'AE',
                    scope: {},
                    link:linkFunction
                }
            }])
            .directive('numberMinus', [function(){
                var linkFunction=function($scope, $element, $attrs){
                    $element.on('click',function(){
                        //console.log($scope.numberAdd);
                        //console.log($scope.max);
                        var val=parseInt($scope.numberMinus)||0;
                        $scope.$apply(function(){
                            if(val<=0){
                                $scope.numberMinus=0;
                            }else{
                                $scope.numberMinus=val-1;
                            }

                        });
                    });
                };
                return{
                    restrict: 'AE',
                    scope: {
                        numberMinus:'=',
                    },
                    link:linkFunction
                }
            }])
            .directive('numberAdd', [function(){
                var linkFunction=function($scope, $element, $attrs){

                    $element.on('click',function(){
                        //console.log($scope.numberAdd);
                        //console.log($scope.max);
                        var val=parseInt($scope.numberAdd)||0;
                        $scope.$apply(function(){
                            if(val>=$scope.max){
                                $scope.numberAdd=parseInt($scope.max);
                            }else{
                                $scope.numberAdd=val+1;
                            }

                        });
                    });

                };
                return{
                    restrict: 'AE',
                    scope: {
                        numberAdd:'=',
                        max:'=',
                    },
                    link:linkFunction
                }
            }])
            .directive('numberControl', [function(){
                var linkFunction=function($scope, $element, $attrs){
                    $element.on('focus',function(){
                        //console.log($scope.ngModel)
                        //console.log($scope.max)
                        var val=parseInt($scope.ngModel)||0;
                        $scope.$apply(function(){
                            if(val==0){
                                $scope.ngModel='';
                            }
                        });
                    });
                    $element.on('blur',function(){
                        //console.log($scope.ngModel)
                        //console.log($scope.max)
                        var val=parseInt($scope.ngModel)||0;
                        $scope.$apply(function(){
                            if(val>=$scope.max){
                                $scope.ngModel=parseInt($scope.max);
                            }else if(!val){
                                $scope.ngModel=0;
                            }
                        });
                    });
                };
                return{
                    restrict: 'AE',
                    scope: {
                        ngModel:'=',
                        max:'=',
                    },
                    link:linkFunction
                }
            }])
        ;
    }

    function bootstrapNg(){
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['halo']);
        });
    }




    return{
        init:init,
    }

}());