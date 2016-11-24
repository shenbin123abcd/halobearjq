app.share=(function(){
    "use strict";
    function init(){
        share();
    }
    function share(){
        var data=[
        {id:1,name:'潘珍玉',job:'创始人',company:'北京｜摩卡婚礼',avatar:'share/person/1.png'},
        {id:14,name:'赖梓愈',job:'设计总监',company:'浙江｜欧城礼仪',avatar:'share/person/14.png'},
        {id:9,name:'陆颀',job:'创始人',company:'上海｜婚礼主义Weddingism',avatar:'share/person/9.png'},
        {id:44,name:'蔡上',job:'创始人',company:'重庆｜蔡上作品',avatar:'share/person/42.png'},
        {id:2,name:'郑白鹭',job:'负责人',company:'北京｜美薇亭婚礼',avatar:'share/person/2.png'},
        {id:3,name:'霍剑',job:'联合创始人',company:'北京｜汇爱、艾恩婚礼',avatar:'share/person/3.png'},
        {id:4,name:'小熊戴欣',job:'创始人',company:'北京｜BEARFETE高端定制',avatar:'share/person/4.png'},
        {id:5,name:'高博',job:'营销总监',company:'玫瑰里文化产业集团',avatar:'share/person/5.png'},
        {id:6,name:'婧文',job:'创始人',company:'北京｜婧文婚礼',avatar:'share/person/6.png'},
        {id:7,name:'刘霖',job:'创始人',company:'辽宁｜爱想婚礼',avatar:'share/person/7.png'},
        {id:8,name:'周鲲翔',job:'创始人',company:'天津｜朗艺团队',avatar:'share/person/8.png'},
        {id:10,name:'李刚',job:'创始人',company:'上海｜诺丁山婚礼',avatar:'share/person/10.png'},
        {id:11,name:'黄思佳',job:'创始人',company:'上海｜TopOne团队',avatar:'share/person/11.png'},
        {id:12,name:'葛欣',job:'创始人',company:'上海｜IMAGEXIN Films',avatar:'share/person/12.png'},
        {id:13,name:'马杰',job:'创始人',company:'上海｜婚礼舍',avatar:'share/person/13.png'},
        {id:15,name:'祝赟',job:'创始人',company:'浙江｜百特婚礼',avatar:'share/person/15.png'},
        {id:16,name:'陈柏锋',job:'联合创始人',company:'浙江｜千百合婚礼',avatar:'share/person/16.png'},
        {id:17,name:'乐益锋',job:'创始人',company:'浙江｜麦瑞婚礼',avatar:'share/person/17.png'},
        {id:18,name:'皇甫燎原',job:'董事长',company:'江苏｜皇家婚礼',avatar:'share/person/18.png'},
        {id:19,name:'飞扬',job:'创始人',company:'江苏｜爱主题婚礼',avatar:'share/person/19.png'},
        {id:20,name:'张洁',job:'创始人',company:'江苏｜DC大蔡婚礼',avatar:'share/person/20.png'},
        {id:21,name:'常真',job:'会长',company:'江苏省婚庆行业协会',avatar:'share/person/21.png'},
        {id:22,name:'王磊',job:'创始人',company:'安徽｜锦玉喜堂婚礼',avatar:'share/person/22.png'},
        {id:23,name:'何海福',job:'创始人',company:'安徽｜喜来也婚礼',avatar:'share/person/23.png'},
        {id:26,name:'简宁',job:'创始人',company:'山东｜艾俪婚礼',avatar:'share/person/24.png'},
        {id:27,name:'张楠',job:'创始人',company:'黑龙江｜尚维婚礼',avatar:'share/person/25.png'},
        {id:28,name:'蔡易瑾',job:'创始人',company:'福建｜易瑾国际婚礼',avatar:'share/person/26.png'},
        {id:29,name:'蒋东',job:'创始人',company:'福建｜糖果CANDY婚礼',avatar:'share/person/27.png'},
        {id:30,name:'董斌',job:'董事长',company:'湖北｜喜庄婚礼',avatar:'share/person/28.png'},
        {id:31,name:'杨智端',job:'创始人',company:'湖北｜飞凌婚礼',avatar:'share/person/29.png'},
        {id:32,name:'龚岩',job:'创始人',company:'河南｜也地婚礼',avatar:'share/person/30.png'},
        {id:33,name:'姚伟',job:'创始人',company:'河南｜牵手婚礼',avatar:'share/person/31.png'},
        {id:34,name:'井鑫',job:'创始人',company:'河南｜小井订制婚礼',avatar:'share/person/32.png'},
        {id:35,name:'朱根',job:'创始人',company:'广东｜银禧婚礼',avatar:'share/person/33.png'},
        {id:36,name:'陆卉',job:'创始人',company:'广西｜紫罗兰婚礼',avatar:'share/person/34.png'},
        {id:37,name:'刘涛',job:'创始人',company:'四川｜唯爱婚礼',avatar:'share/person/35.png'},
        {id:38,name:'王可',job:'创始人',company:'四川｜喜来婚礼',avatar:'share/person/36.png'},
        {id:39,name:'郭薇',job:'创始人',company:'四川｜婚礼尚WeddingMode',avatar:'share/person/37.png'},
        {id:40,name:'刘婷',job:'总经理',company:'重庆｜萝亚婚礼',avatar:'share/person/38.png'},
        {id:41,name:'吴寅东',job:'创始人',company:'重庆｜东亚婚礼',avatar:'share/person/39.png'},
        {id:42,name:'吴斌',job:'创始人',company:'重庆｜泰一婚礼',avatar:'share/person/40.png'},
        {id:43,name:'冉慧聪',job:'创始人',company:'重庆｜礼由婚礼',avatar:'share/person/41.png'},
        {id:45,name:'李玉丽',job:'创始人',company:'海南｜微奢婚礼',avatar:'share/person/43.png'},
        {id:46,name:'谭维东',job:'创始人',company:'湖南｜造梦师婚礼',avatar:'share/person/44.png'},
        {id:47,name:'段晓峰',job:'创始人',company:'陕西｜八零婚礼',avatar:'share/person/45.png'},
        {id:48,name:'马非',job:'创始人',company:'贵州｜新新娘婚礼',avatar:'share/person/46.png'},
        {id:49,name:'墨非',job:'策划总监',company:'甘肃｜维莱诗婚礼',avatar:'share/person/47.png'},
        {id:50,name:'白洁',job:'创始人',company:"甘肃｜馨婚尚婚礼",avatar:'share/person/48.png'},
        {id:51,name:'李圆圆',job:'创始人',company:'北京｜i尚婚礼策划',avatar:'share/person/49.png'},
        {id:52,name:'James Lai',job:'创始人',company:'福建｜Lais宴会</br>视觉空间',avatar:'share/person/50.png'},
        {id:53,name:'李俊竹',job:'理事长',company:'台湾｜中华国际婚礼协会',avatar:'share/person/51.png'},
        {id:54,name:'马良',job:'创始人',company:'浙江｜梦境婚礼',avatar:'share/person/52.png'}
    ];
        var htmlStr="";
        data.forEach(function(n,i){
            htmlStr+=`
                <div class="itemt ">
                    <div class="person">
                        <img src="images/${n.avatar}" alt="">
                    </div>
                    <div class="person-text">
                        <span class="title f-11">${n.name}</span>
                        <span class="text f-9">${n.job}</span>
                        <span class="text f-9">${n.company}</span>
                    </div>
                </div>
            `
        });

        $("#itemt-list").empty().html(htmlStr);

    }
    return{
        init:init,
    }

}());