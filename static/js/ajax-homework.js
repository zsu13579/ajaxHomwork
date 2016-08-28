$(function(){
	
    //搜索框 & 搜索结果
    var flag = 0;	
    $(".searchipt").focusin(function(){
    	if(flag == 0){
	    	$(".suggestion").stop();
	    	$(".suggestion").show().animate({"height":"70px"});
	    	flag = 1
    	};
    	$(this).keydown(function(e){
    		if(e.keyCode!=27&&e.keyCode!=127&&e.keyCode!=123){
    			suggestionClear();
    			deleteLi();
	    		$(".suggestion_result").stop();
		    	$(".suggestion_result").show().animate({"height":"70px"});
		    	do_ajax();
		    	flag = 1
	    	}
    	});
    });
    $(".searchipt").focusout(function(){
    	if(flag == 1){
    		flag = 3
    	}
    });
    $(".suggestion").mouseenter(function(){
    	flag = 2
    });
    $(".suggestion").mouseleave(function(){
    	flag = 3
    });
    
    
    //公用部分
    $(document).click(function(){
    	if(flag == 3){
    		suggestionClear();
    		suggestionresultClear();
	    	flag = 0
    	};
    	
//  	if(flag == ){
//  		suggestionresultClear();
//	    	flag = 
//  	};
    	
    });
       
    //suggestion clear function
    function suggestionClear(){
    	$(".suggestion").stop();
    	$(".suggestion").animate({"height":"0px"},function(){$(this).hide()});    	
    };
    
    function suggestionresultClear(){
    	$(".suggestion_result").stop();
    	$(".suggestion_result").animate({"height":"0px"},function(){$(this).hide()});    	
    };
    
    function deleteLi(){
    	var hint = $(".suggestion_result li");
    	hint.each(function(){
    		$(this).remove();
    	})
    }

	function do_ajax(){
		vkey = $(".searchipt").val();
		$.get("/do_ajax/",{"vkey": vkey},function(result){
			result=eval("("+result+")")
//			alert(result[1]["fields"])
//			alert(result[1].fields.searchkey)
			if(result){
//				for(r in result){
////					alert(r)
//					$(".suggestion_result").append("<li>"+r+"</li>");
//				};
//				deleteLi();
				$.each(result,function(entryindex,entry){
					$(".suggestion_result").append("<li>"+entry.fields.searchkey+"</li>");
				});
//				$(".suggestion_result").css("background-color","green");
			}else{
				$(".suggestion_result").css("background-color","red");
			}
//			$(".suggestion_result").val(result.message);
			});
//		$(".test").html("test");
	};
    	
});
