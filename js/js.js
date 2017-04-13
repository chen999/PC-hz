/**
 * Created by Administrator on 2016/8/30.
 */
var json={
    selectFirstNodes:$('#header .nav .selectFirst'),//第一层的li
    selectSecondNodes:$('#header .nav .selectSecond'),//第二层的li
    flashOneImg:$('.flash-img'),//第一个动画的图片的大div
    flashOneSpan:$('.flash-span span'),//第一个动画的span集合
    flashOneList:$('.flash-img li'),//第一个动画的li集合
    flashTwoList:$('.intro li'),//第二个动画的li集合
    flashTwoDiv:$('.intro div'),//第二个动画的图片所在div集合
    aboutUsLeftNode:$('.aboutUsLeft'),
    aboutUsRightNode:$('.aboutUsRight'),
    aboutUsRightList:$('.aboutUsRight li'),
    partnerNode:$('.partner'),
    partnerList:$('.partner li'),
    toTopNode:$('#toTop'),
    headlineList:$('.headline li'),
    exampleCenterNode:$('.exampleCenter'),
    exampleUlNodes:$('.example ul'),
    selectFirstListShow:function(){//第一层下拉菜单显示
        var $this=this;
        var aNodes=$this.selectFirstNodes.children('a');
        aNodes.mouseenter(function(e){
            var target= e.target;
            var aNode=$(target);
            aNode.siblings('.select-list').show();
        });
    },
    selectFirstListHide:function(){//第一层下拉菜单隐藏
        var $this=this;
        var liNodes=$this.selectFirstNodes;
        liNodes.mouseleave(function(e){
            var target= e.target;
            var liNode=$(target);
            if(liNode.is('li')||liNode.is('a')||liNode.is('.select-list')){
                if(liNode.is('.select-list'))
                    liNode=liNode.parent();
                else if(liNode.is('a')){
                    if(liNode.parent().hasClass('select'))//外层的a
                        liNode=liNode.parent();
                    else
                        liNode=liNode.parent().parent().parent();
                }
                else{
                    if(liNode.parent().parent().hasClass('select'))//里层的li
                        liNode=liNode.parent().parent();
                }
            }
            liNode.children('.select-list').hide();
        });
    },
    selectSecondListShow:function(){//第二层下拉菜单显示
        var $this=this;
        var aNodes=$this.selectSecondNodes.children('a');
        aNodes.mouseenter(function(e){
            var target= e.target;
            var aNode=$(target);
            aNode.siblings('.select-list').show();
        });
    },
    selectSecondListHide:function(){//第二层下拉菜单隐藏
        var $this=this;
        var liNodes=$this.selectSecondNodes;
        liNodes.mouseleave(function(e){//没有进入第二菜单
            var target= e.target;
            var liNode=$(target);
            if(liNode.is('li')||liNode.is('a')||liNode.is('dl')){
                if(!liNode.is('li')){
                    liNode=liNode.parent();
                }
            }
            //console.log('没有进入第二菜单'+liNode);
            liNode.children('.select-list-next').hide();
        });
    },
    flashOneMoveFun:function(oldPos,newPos){
        var $this=this;
        $this.flashOneSpan.eq(newPos).addClass('current');
        $this.flashOneSpan.eq(oldPos).removeClass();
        $this.flashOneList.eq(newPos).stop(false,true).fadeIn(1000);
        $this.flashOneList.eq(oldPos).stop(false,true).fadeOut(1000);
    },
    flashOneSpanMove:function(){//动画一的span效果
        var $this=this;
        $this.flashOneSpan.mouseenter(function(){
            //console.log($(this));
            if($(this).hasClass('current'))
                return;
            var oldPos=$('.flash-span .current').index();
            var newPos=$(this).index();
            $this.flashOneMoveFun(oldPos,newPos);
        });
    },
    flashOneBtnShowAndHide:function(){//动画一的左右箭头隐藏出现
        var $this=this;
        $this.flashOneImg.hover(
            function(){
                $this.flashOneImg.children('a').show();
            },
            function(){
                $this.flashOneImg.children('a').hide();
            }
        )
    },
    flashOneRight:function(){//动画一的右箭头效果
        var $this=this;
        $('.right').click(function(){
            var oldPos=$('.flash-span .current').index();
            var newPos;
            if(oldPos==$this.flashOneList.length-1)
                newPos=0;
            else
                newPos=oldPos+1;
            $this.flashOneMoveFun(oldPos,newPos);
        });
    },
    flashOneLeft:function(){//动画一的左箭头效果
        var $this=this;
        $('.left').click(function(){
            var oldPos=$('.flash-span .current').index();
            var newPos;
            if(oldPos==0)
                newPos=$this.flashOneList.length-1;
            else
                newPos=oldPos-1;
            $this.flashOneMoveFun(oldPos,newPos);
        });
    },
    flashTwoMove:function(){//动画二（4个球）的效果
        var $this=this;
        $this.flashTwoDiv.mouseenter(function(){
            if($(this).parent().hasClass('current')){
                return;
            }
            var oldPos=$('.intro .current').index();
            var newPos=$(this).parent().index();
            console.log(oldPos,newPos);
            $this.flashTwoList.eq(newPos).addClass('current');
            $this.flashTwoList.eq(oldPos).removeClass();
        });
    },
    aboutUsLeftMove:function(){//关于汇众的效果
        var $this=this;
        $this.aboutUsLeftNode.mouseenter(function(){//放大出现
            $(this).children('img').css({transform:'scale(1.2,1.2)',transition:'all 1s'});
            $(this).children('span').animate({top:'0'},1000);
        });
        $this.aboutUsLeftNode.mouseleave(function(){//缩小消失
            $(this).children('img').css({transform:'scale(1,1)',transition:'all 1s'});
            $(this).children('span').animate({top:'241px'},1000);
        });
    },
    aboutUsRightBtn:function(){
        var $this=this;
        var btnNodes=$this.aboutUsRightNode.find('.btn a');
        btnNodes.eq(0).click(function(){//向右移
            //console.log(btnNodes.eq(1));
            var oldPos=$('.aboutUsRight .current').index();
            if(oldPos==$this.aboutUsRightList.length-1)
                return;
            var newPos=oldPos+1;
            $this.aboutUsRightList.eq(newPos).addClass('current');
            $this.aboutUsRightList.eq(oldPos).removeClass();
        });
        btnNodes.eq(1).click(function(){//向左移
            var oldPos=$('.aboutUsRight .current').index();
            if(oldPos==0)
                return;
            var newPos=oldPos-1;
            $this.aboutUsRightList.eq(newPos).addClass('current');
            $this.aboutUsRightList.eq(oldPos).removeClass();
        });
    },
    partnerBtn:function(){
        var $this=this;
        var btnNodes=$this.partnerNode.find('.btn a');
        btnNodes.eq(0).click(function(){//向右移
            var ulNode=$this.partnerNode.find('ul');
            ulNode.stop().animate({marginLeft:'-=200px'},1000,function(){
                ulNode.children().eq(0).appendTo(ulNode);
                ulNode.css('marginLeft','0px');
            });
        });
        btnNodes.eq(1).click(function(){//向左移
            var ulNode=$this.partnerNode.find('ul');
            ulNode.children().eq($this.partnerList.length-1).prependTo(ulNode);
            ulNode.css('marginLeft','-200px');
            ulNode.stop().animate({marginLeft:'+=200px'},1000);
        });
    },
    toTopShowAndHide:function(){
        var $this=this;
        $(window).scroll(function(){
            var scrollTopNum=document.documentElement.scrollTop+document.body.scrollTop;
            var winHeight=document.documentElement.clientHeight;
            //console.log(scrollTopNum,winHeight)
            if(scrollTopNum>winHeight){
                $this.toTopNode.show();
            }
            else{
                $this.toTopNode.hide();
            }
        });
    },
    headlineClick:function(){
        var $this=this;
        $this.headlineList.click(function(e){
            var target= e.target;
            var aNode=$(target);
            if(aNode.parent().hasClass('current')){
                return;
            }
            var oldPos=$('.headline .current').index();
            var newPos=aNode.parent().index();
            $this.headlineList.eq(newPos).addClass('current');
            $this.headlineList.eq(oldPos).removeClass();
            if(newPos==$this.headlineList.length-1){
                return;
            }
            var exampleHeight=$this.exampleUlNodes.eq(newPos).css('height');
            console.log(oldPos,newPos,exampleHeight);
            $this.exampleCenterNode.css('height',exampleHeight);
            $this.exampleUlNodes.eq(newPos).fadeIn(1000);
            $this.exampleUlNodes.eq(oldPos).fadeOut(1000);
        });
    },
    init:function(){
        this.selectFirstListShow();
        this.selectFirstListHide();
        this.selectSecondListShow();
        this.selectSecondListHide();
        this.flashOneSpanMove();
        this.flashOneBtnShowAndHide();
        this.flashOneRight();
        this.flashOneLeft();
        this.flashTwoMove();
        this.aboutUsLeftMove();
        this.aboutUsRightBtn();
        this.partnerBtn();
        this.toTopShowAndHide();
        this.headlineClick();
    }

};
json.init();
//console.log(json.flashTwoDiv);